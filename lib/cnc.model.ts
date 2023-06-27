// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { KalturaAppTokenFilter } from "kaltura-node-typescript-client/api/types/KalturaAppTokenFilter";
import { AppTokenListAction } from "kaltura-node-typescript-client/api/types/AppTokenListAction";
import { KalturaAppTokenStatus } from "kaltura-node-typescript-client/api/types/KalturaAppTokenStatus";
import { KalturaFilterPager } from "kaltura-node-typescript-client/api/types/KalturaFilterPager";
import config from "./config";
import jsonwebtoken from "jsonwebtoken";
import { KalturaClientWrapper } from "./kaltura-client-wrapper";
import { KalturaAppToken } from "kaltura-node-typescript-client/api/types/KalturaAppToken";
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { xhrLogMessages } from "./xhrLogMessages";

const modelCache = new CacheContainer(new MemoryStorage());
const CNC_TOKEN_CACHE_TTL = 2592000; // 30 days cache

const { id: partnerId }: any = config.get("partner");

const CnCExpirationMinutes = 24 * 60;//This is a 24 hour JWT

export async function getCncJwt(userId: string, entryId: string, isModerator: boolean, eventId: string): Promise<string> {
  const token = await getAppToken();
  return signJwt(token, userId, entryId, isModerator, eventId);
}

/**
 * Generates a JSON Web Token (JWT) with the given secret and user information.
 * @param {string} secret - The secret used to sign the JWT.
 * @param {string} userId - An array containing the user information: uid, dep, and a boolean indicating whether the user is a moderator.
 * @param {booleam} isModerator - if user is in group of moderators for entry - should pass true, otherwise false
 * @returns {string} - The signed JWT as a string.
*/
function signJwt(secret: string, userId: string, entryId: string, isModerator: boolean, eventId): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * CnCExpirationMinutes; // The expired date is 2 minuytes fast

  let groups: string[] = [];
  if (isModerator) {
    groups.push(`${entryId}_moderators`);
  }
  const user = {
    partnerId: partnerId,
    uid: userId,

    contextId: entryId,
    groups,

    exp: exp,
    isAdmin: false,
    isScopedUser: true,
    virtualEventId: eventId,
  };
  return jsonwebtoken.sign(user, secret, {
    header: { kid: partnerId, alg: "HS256" },
  });
}

/**
 * Retrieves an active app token with the specified session privileges from Kaltura using the provided session client.
 *
 * @async
 * @function getAppToken
 * @throws {Error} Throws an error if no app token is found, or if multiple app tokens are found.
 * @param {Object} [client] - The session client to use for the request. Defaults to the result of getSessionClient().
 * @returns {Promise<string>} Returns a Promise that resolves to the token of the retrieved app token.
 */
async function getAppToken(): Promise<string> {
  const cachedToken = await modelCache.getItem<string>("cnctoken");
  if(cachedToken) {
    xhrLogMessages.addMessage('appToken', "cached");
    return cachedToken;
  }

  const client = KalturaClientWrapper.getAdminClient();
  const filter = new KalturaAppTokenFilter();
  filter.statusEqual = KalturaAppTokenStatus.active;

  const pager = new KalturaFilterPager();
  xhrLogMessages.addMessage("appToken", "not cached");
  const result = await client.request(new AppTokenListAction({filter, pager}))
  let appTokens: KalturaAppToken[] = [];
  if(result && result.totalCount > 0) {
    appTokens = result.objects.filter(
      ({ sessionPrivileges }: any) => sessionPrivileges === "cncAuth:true"
    );
  }
  if (appTokens.length !== 1) {
    throw new Error(
      `Failed to find one an app token, found ${appTokens.length}`
    );
  }
  await modelCache.setItem("cnctoken", appTokens?.[0].token, {ttl: CNC_TOKEN_CACHE_TTL})
  return appTokens?.[0].token;
}
