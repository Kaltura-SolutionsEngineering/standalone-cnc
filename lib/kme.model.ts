import { createHmac } from "crypto";
import config from "./config";
import { KalturaUser } from "kaltura-node-typescript-client/api/types/KalturaUser";

export async function getKme(
  entry: any,
  user: KalturaUser
): Promise<any[]> {
  // if entry type is not a room or a meeting entry - do not try to launch it.
  if(entry.type !== 'room.room' && (entry.adminTags && entry.adminTags.indexOf('_room') < 0)) {
    return [null, null];
  }
  // // Configuration
  const key = config.get("kmeKey"); // KME key - to be provided by Kaltura admin (via NAP)

  const secret = config.get("kmeSecret"); // KME secret - to be provided by Kaltura admin (via NAP)
  const launchUrl = config.get("kmeLaunchUrl");
  const kmeRole = config.get("kmeRole");
  const startTime = Date.now();

  const launchData: { [key: string]: string } = {
    // Consumer identifier (Vendor name like: desire2learn, moodle, etc.)
    tool_consumer_info_product_family_code: "kaltura",

    //------------------
    // User details
    //------------------

    user_id: user.id, // Internal authenticated user id in your system
    roles: kmeRole, // User role ('Administrator','Instructor', 'Student')
    lis_person_contact_email_primary: user.email, // User email
    lis_person_name_given: user.firstName,
    lis_person_name_family: user.lastName, // User last name

    //------------------
    // Room details
    //------------------
    context_id: entry.id,
    context_title: entry.name, // room name
    custom_kaltura_room_type: "channel", // 'channel' or 'resource'; this field may not matter
    custom_rs_user_lang: "en-VE", // specify room's language to Virtual Events English (this is optional or can be set to any language)
    custom_company_logo:
      "https://corp.kaltura.com/wp-content/uploads/2020/07/All_Logos_Kaltura_Logo_Vertical_ColorSun_BlackText.jpg", // room logo (optional)
  };

  // ------------------------------
  // OAUTH CONFIGURATION
  // ------------------------------
  const now: number = Date.now();
  const base36: string = now.toString(36);
  const now2: Date = new Date();
  const secondsSinceUnixEpoch: number = Math.floor(now2.getTime() / 1000);
  launchData["lti_version"] = "LTI-1p0";

  // Basic LTI uses OAuth to sign requests
  // OAuth Core 1.0 spec: http://oauth.net/core/1.0/
  launchData["oauth_callback"] = "about:blank";
  launchData["oauth_consumer_key"] = key;
  launchData["oauth_version"] = "1.0";
  launchData["oauth_nonce"] = base36;
  launchData["oauth_timestamp"] = secondsSinceUnixEpoch.toString();
  launchData["oauth_signature_method"] = "HMAC-SHA1";

  // In OAuth, request parameters must be sorted by name
  const launchDataKeys: string[] = Object.keys(launchData);
  launchDataKeys.sort();
  const launchParams: string[] = [];
  for (const key of launchDataKeys) {
    launchParams.push(key + "=" + encodeURIComponent(launchData[key]));
  }
  const baseString: string =
    "POST&" +
    encodeURIComponent(launchUrl) +
    "&" +
    encodeURIComponent(launchParams.join("&"));
  const signingKey: string = encodeURIComponent(secret) + "&";
  const signature: string = createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

    const total = Date.now()-startTime;
    console.log("building LTI launch took "+total+" ms");
  return [launchData, signature];
}
