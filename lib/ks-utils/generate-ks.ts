import type {KalturaSessionType} from "kaltura-node-typescript-client/api/types/KalturaSessionType";
import {PrivilegeType} from "./privilege-type";
import {randomBytes} from "crypto";
import {aesEncode, sha1, toBuffer} from "./common";

export interface GenerateKsOptions {
  partnerId: number;
  adminSecret: string;
  type: KalturaSessionType;
  userId?: string;
  privileges?: Partial<Record<PrivilegeType, string>>;
  expiry?: number;
}
  
export const generateKs = ({
  partnerId,
  adminSecret,
  type,
  userId = "",
  privileges = {[PrivilegeType.DisableEntitlement]: ""},
  expiry = 600,
}: GenerateKsOptions): string => {
  const fields = privileges;

  // Normalize expiry to the absolute timestamp (the input could be relative to the current time)
  const now = Math.floor(Date.now() / 1000);
  if (expiry < now / 2) {
    expiry += now;
  }

  // Add system fields
  fields["_e"] = expiry.toString();
  fields["_t"] = type.toString();
  fields["_u"] = userId;

  // URL-encode the fields
  let privString = Object.entries(fields)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join("&")
  let data = toBuffer(
    privString
  );
  console.log(privString);

  // Add random characters
  data = Buffer.concat([randomBytes(16), data]);

  // Sign by a hash
  data = Buffer.concat([sha1(data), data]);

  // No need for an IV since we add a random string to the message anyway
  const aesIv = toBuffer("\0".repeat(16));
  const aesKey = sha1(toBuffer(adminSecret)).subarray(0, 16);

  // AES-encode
  const rawKs = Buffer.concat([toBuffer(`v2|${partnerId}|`), aesEncode(data, aesKey, aesIv)]);

  // Base64-encode
  return rawKs.toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
};