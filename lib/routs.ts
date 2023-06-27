import Router from "@koa/router";
import { KalturaUser } from "kaltura-node-typescript-client/api/types/KalturaUser";
import { UserModel } from "./user.model";
import config from "./config";
import { getCncJwt } from "./cnc.model";
import { getEntry } from "./entry.model";
import { getKme } from "./kme.model";
import { getLeaderBoardData } from "./getLeaderBoardData";
import { xhrLogMessages } from "./xhrLogMessages";
import { getModeratorsGroupId, validateGroupExists } from "./group.model";

const router = new Router({ prefix: "/embed-cnc" });
const { id: partnerId } = config.get("partner");
const uiconfid = config.get("uiConfid");
const reactionUiConfid = config.get("reactionUiConfid");
const cncPlayerID = config.get("cncPlayerID");
const useGroupsForModerators = config.get("useGroupsForModerators");

// This route is responsible for initializing and retrieving all the required data for the "embed-cnc" functionality
router.get("/init-all-data", async (ctx: any) => {
  xhrLogMessages.clearMessages();

  const groupId = (ctx.request.query.entryId)? getModeratorsGroupId(ctx.request.query.entryId): '';

  if(useGroupsForModerators && groupId !== '') {
    await validateGroupExists(groupId);
  }

  // the following handles detection if user exists and return a KS for that user (whether exists or added).
  // it also returns the user object with all the user info on it, and a boolean that says if the user is moderator on the entry
  // this KS is passed to player
  const user = new KalturaUser();
  user.id = ctx.request.query.userId;
  user.firstName = ctx.request.query.first;
  user.lastName = ctx.request.query.last;
  user.company = ctx.request.query.company;
  user.email = ctx.request.query.email;

  const setAsModerator: boolean = ctx.request.query.setAsModerator === "true";

  const userModel = new UserModel(user, groupId, ctx.request.query.virtualEventId, setAsModerator);
  try {
    await userModel.getUserData();
  } catch (e) {
    // something went wrong - log and rethrow error
    console.log("something went wrong getting/creating user");
    throw e;
  }

  // the following generates a JWT for the user. JWT is passed to CNC widget
  const jwt = await getCncJwt(userModel.user.id, ctx.request.query.entryId, userModel.isModerator, ctx.request.query.virtualEventId);
  
  // the following gets the entry object
  const entryPromise = getEntry(ctx.request.query.entryId);
  //TODO add if to see if its KME
  const kmeRoomLtiPromise = getKme(await entryPromise, user);

  const [kmeRoomLti, entry] = await Promise.all([
    kmeRoomLtiPromise,
    entryPromise,
  ]);

  ctx.body = {
    ks: userModel.userKs,
    jwt,
    partnerId,
    uiconfid,
    entry,
    kmeRoomLti,
    reactionUiConfid,
  };
  ctx.set('x-xhr-messages', xhrLogMessages.getMessagesAsHeaderString());
});

router.get("/get-leaderboard", async (ctx: any) => {
  try {
    const lb = await getLeaderBoardData();
    ctx.body = lb;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
});

// This route is used to retrieve library data required for Player and CnC Libraries
router.get("/get-lib-data", async (ctx: any) => {
  ctx.body = { partnerId, uiconfid, cncPlayerID, useGroupsForModerators }; //needed for Player and CnC Libraries
});

export default router;
