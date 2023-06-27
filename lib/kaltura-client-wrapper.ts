import { KalturaClient } from "kaltura-node-typescript-client";
import {initializeLogger} from "kaltura-node-typescript-client/api/kaltura-logger";
import config from "./config";
import { generateKs } from "./ks-utils/generate-ks";
import { KalturaSessionType } from "kaltura-node-typescript-client/api/types/KalturaSessionType";
import { PrivilegeType } from "./ks-utils/privilege-type";

export enum UserKSContext {
    'player'
}


export class KalturaClientWrapper {
    static getAnonymousClient() {
        initializeLogger({
            verbose: (msg) => console.log(msg),
            debug: (msg) => console.debug(msg),
            info: (msg) => console.log(msg),
            warn: (msg) => console.warn(msg),
            error: (msg) => console.error(msg),
            fatal: (msg) => console.error(msg),
        });
        return new KalturaClient({
          endpointUrl: config.get("kalturaUrl"),
          clientTag: "sample-cnc-app",
        });
    }

    static getAdminClient() {
        initializeLogger({
            verbose: (msg) => console.log(msg),
            debug: (msg) => console.debug(msg),
            info: (msg) => console.log(msg),
            warn: (msg) => console.warn(msg),
            error: (msg) => console.error(msg),
            fatal: (msg) => console.error(msg),
        });
        const { id: partnerId, adminSecret, adminUserId } = config.get("partner");
        const pid = Number.parseInt(partnerId);
        return new KalturaClient({
            endpointUrl: config.get("kalturaUrl"),
            clientTag: "sample-cnc-app",
          }, {
            ks: generateKs({
                partnerId: pid,
                adminSecret: adminSecret || '',
                type: KalturaSessionType.admin,
                userId: adminUserId || '',
                privileges: {[PrivilegeType.DisableEntitlement]: ""},
                expiry: 60,
              }
          )}
        );
    }

    static getUserClient(userId: string, context: UserKSContext, privileges?: Object, expiry: number = 86400) {
        initializeLogger({
            verbose: (msg) => console.log(msg),
            debug: (msg) => console.debug(msg),
            info: (msg) => console.log(msg),
            warn: (msg) => console.warn(msg),
            error: (msg) => console.error(msg),
            fatal: (msg) => console.error(msg),
        });
        const { id: partnerId, adminSecret, adminUserId } = config.get("partner");
        const pid = Number.parseInt(partnerId);

        let allPrivileges = Object.assign({}, privileges);
        switch(context) {
            case UserKSContext.player:
                allPrivileges[PrivilegeType.SetRole]= "PLAYBACK_BASE_ROLE";
                break;
        }

        return new KalturaClient({
            endpointUrl: config.get("kalturaUrl"),
            clientTag: "sample-cnc-app",
          }, {
            ks: generateKs({
                partnerId: pid,
                adminSecret: adminSecret || '',
                type: KalturaSessionType.user,
                userId: userId,
                privileges: allPrivileges,
                expiry,
              }
          )}
        );
    }

}
