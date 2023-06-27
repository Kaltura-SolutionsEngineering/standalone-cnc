// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BaseEntryGetAction } from "kaltura-node-typescript-client/api/types/BaseEntryGetAction";
import { KalturaClientWrapper } from "./kaltura-client-wrapper";
import { KalturaBaseEntry } from "kaltura-node-typescript-client/api/types/KalturaBaseEntry";
import { KalturaMediaEntry } from "kaltura-node-typescript-client/api/types/KalturaMediaEntry";
import { KalturaLiveStreamEntry } from "kaltura-node-typescript-client/api/types/KalturaLiveStreamEntry";
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { xhrLogMessages } from "./xhrLogMessages";

const modelCache = new CacheContainer(new MemoryStorage());
const ENTRY_OBJECT_CACHE_TTL = 86400; // 1 day cache

export async function getEntry(entryId: string): Promise<KalturaBaseEntry|null> {
  if(!entryId) {
    return null;
  }
  const cachedEntry = await modelCache.getItem<KalturaBaseEntry>("entry_"+entryId);
  if(cachedEntry) {
    xhrLogMessages.addMessage('entry', "cached");
    return cachedEntry;
  }

  const client = KalturaClientWrapper.getAdminClient();

  try {
    xhrLogMessages.addMessage("entry", 'not cached');
    const entry = await client.request(new BaseEntryGetAction({entryId}).setRequestOptions({acceptedTypes: [KalturaMediaEntry, KalturaLiveStreamEntry]}));
    await modelCache.setItem("entry_"+entryId, entry, {ttl: ENTRY_OBJECT_CACHE_TTL});
    return entry;
  } catch(e) {
    return null;
  }
}
