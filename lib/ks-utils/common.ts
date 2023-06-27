import {createCipheriv, createDecipheriv, createHash} from "crypto";
import {Buffer} from "buffer";

export const toBuffer = (value: string) => Buffer.from(value, "binary");

export const sha1 = (value: Buffer) => {
  const sha1Hasher = createHash("sha1", {encoding: "binary"});
  sha1Hasher.update(value);
  return sha1Hasher.digest();
};

export const padBuffer = (buffer: Buffer, blockSize: number) => {
  const mod = buffer.length % blockSize;
  return mod ? Buffer.concat([buffer], buffer.length - mod + blockSize) : buffer;
};

export const trimBuffer = (buffer: Buffer) => {
  let nullsCount = 0;
  while (nullsCount < buffer.length && buffer[buffer.length - 1 - nullsCount] === 0) {
    ++nullsCount;
  }
  return nullsCount ? buffer.subarray(0, buffer.length - nullsCount) : buffer;
};

export const aesEncode = (data: Buffer, key: Buffer, iv: Buffer) => {
  const cipher = createCipheriv("aes-128-cbc", key, iv, {encoding: "binary"});
  cipher.setAutoPadding(false);
  return Buffer.concat([cipher.update(padBuffer(data, 16)), cipher.final()]);
};

export const aesDecrypt = (data: Buffer, key: Buffer, iv: Buffer) => {
  const decipher = createDecipheriv("aes-128-cbc", key, iv, {encoding: "binary"});
  decipher.setAutoPadding(false);
  const decoded = decipher.update(data);
  const final = decipher.final();
  return trimBuffer(Buffer.concat([decoded, final], decoded.length + final.length));
};