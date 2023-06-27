export const MultiValueDelimiter = "/";

const Wildcard = "*";
const KeyValueSeparator = ":";
const Separator = ",";

export enum PrivilegeType {
  Edit = "edit",
  View = "sview",
  List = "list",
  Download = "download",
  DownloadAsset = "downloadasset",
  EditEntryOfPlaylist = "editplaylist",
  ViewEntryOfPlaylist = "sviewplaylist",
  ActionsLimit = "actionslimit",
  SetRole = "setrole",
  LimitEntry = "limitentry",
  IpRestriction = "iprestrict",
  UriRestriction = "urirestrict",
  EnableEntitlement = "enableentitlement",
  DisableEntitlement = "disableentitlement",
  DisableEntitlementForEntry = "disableentitlementforentry",
  PrivateContext = "privacycontext",
  EnableCategoryModeration = "enablecategorymoderation",
  ReferenceTime = "reftime",
  SessionKey = "sessionkey",
  Preview = "preview",
  SessionId = "sessionid",
  BatchJobType = "jobtype",
  AppToken = "apptoken",
  DisablePartnerChangeAccount = "disablechangeaccount",
  EditUser = "edituser",
  EnableCaptionModeration = "enablecaptionmoderation",
  EditAdminTags = "editadmintags",
  RestrictExplicitLiveView = "restrictexplicitliveview",
  SearchContext = "searchcontext",
  AppId = "appid",
  VirtualEventId = "virtualeventid",
  UserId = "userId",
}

export class KsPrivileges {
  private readonly privileges: Map<PrivilegeType | string, string[]> = new Map<
    PrivilegeType | string,
    string[] | null
  >();

  public toString(): string {
    const privilegesStrings: string[] = [];
    this.privileges.forEach(function (values: string[], key: string) {
      if (values !== null) {
        privilegesStrings.push(key + KeyValueSeparator + values.join(MultiValueDelimiter));
      } else {
        privilegesStrings.push(key);
      }
    });
    return privilegesStrings.join(Separator);
  }

  public isEnabled(key: PrivilegeType): boolean {
    return this.privileges.has(key);
  }

  public enable(key: PrivilegeType): this {
    this.privileges.set(key, null);
    return this;
  }

  public disable(key: PrivilegeType): this {
    this.privileges.delete(key);
    return this;
  }

  public setString(key: PrivilegeType, value: string): this {
    this.privileges.set(key, [value]);
    return this;
  }

  public setNumber(key: PrivilegeType, value: number): this {
    this.privileges.set(key, [value.toString()]);
    return this;
  }

  public setStrings(key: PrivilegeType, values: string[]): this {
    this.privileges.set(key, values);
    return this;
  }

  public setWildCard(key: PrivilegeType): this {
    this.privileges.set(key, [Wildcard]);
    return this;
  }

  public getValue(key: PrivilegeType): string {
    if (!this.isEnabled(key)) {
      return undefined;
    }
    const values = this.privileges.get(key);
    if (values.length > 0) {
      return values[0];
    } else {
      return undefined;
    }
  }

  public getValues(key: PrivilegeType): string[] {
    if (!this.isEnabled(key)) {
      return [];
    }
    return this.privileges.get(key);
  }
}