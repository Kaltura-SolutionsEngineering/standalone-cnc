// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import kaltura from "kaltura-client";
import config from "./config";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";

const serviceUrl = config.get("kalturaUrl");

const { id: partnerId, adminSecret, adminUserId } = config.get("partner");
const clientConfig = new kaltura.Configuration({ serviceUrl });
const client = new kaltura.Client(clientConfig);
const type = kaltura.enums.SessionType.USER;
const expiry = 86400 as const;
const privileges = "disableentitlement" as const;

export async function getLeaderBoardData(): Promise<string> {
  let response; // Declare the variable outside the try block
  const sessionClient = await getSessionClient();
  const ks = sessionClient.getKs();

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url:
      "https://www.kaltura.com/api_v3/service/game_userscore/action/list?ks=" +
      ks +
      "&format=1&clientTag=devkcom",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      filter: {
        gameObjectType: "1",
        gameObjectId: "646cbd7ab7176bd729f2fa66",
      },
    }),
  };

  try {
    const response = await axios.request(config);
    const responseData = response.data; // Extract the specific data you need

    const modifiedResponse = {
      ...responseData,
      objects: await getNames(responseData.objects),
    };

    console.log(JSON.stringify(modifiedResponse));
    return modifiedResponse;
  } catch (error) {
    console.error("Failed to get LB data", error);
    throw error;
  }

  return response.data;
}

async function getSessionClient(): Promise<any> {
  const client = new kaltura.Client(clientConfig);
  return await new Promise((res, rej) => {
    kaltura.services.session
      .start(
        adminSecret,
        adminUserId,
        kaltura.enums.SessionType.ADMIN,
        partnerId
      )
      .completion((success: boolean, ks: string | Error) => {
        if (!success) {
          return rej((<Error>ks).message);
        }
        client.setKs(ks);
        res(client);
      })
      .execute(client);
  });
}

export async function getUser(user: string): Promise<string> {
  debugger;
  const client = await getSessionClient();
  const filter = new kaltura.objects.UserFilter();

  filter.idEqual = user;
  const pager = new kaltura.objects.FilterPager();
  const result = await kaltura.services.user
    .listAction(filter, pager)
    .execute(client);

  const userIdEP = result.objects[0].fullName;

  return userIdEP;
}

async function getNames(objects: any) {
  const updatedObjects = [];

  for (const object of objects) {
    const userId = object.userId;

    const name = await getUser(userId); // Call the function to fetch name using userId
    updatedObjects.push({
      ...object,
      name,
    });
  }

  return updatedObjects;
}
