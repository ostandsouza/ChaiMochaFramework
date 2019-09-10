import axios from "axios";
import * as CryptoJS from "crypto-js";
import { encrypt } from "./encrypt-decrypt";
import { ApiKey, Params } from "../interfaces";
import { postData } from "./keyexchange";
import { KEYBITS, RESTURL } from "./constants";
import { RestApiUri } from "./apiDefinitions";


export const restApiCall = (
  uri: RestApiUri,
  data?: any,
  apiKey?: ApiKey
): Promise<any> => {
  let jsonParams: Params;
  let bodyData: string = "";
  if (apiKey !== undefined) {
    if (data !== undefined) {
      let encryptData = encrypt(
        JSON.stringify(data),
        apiKey.serverKey,
        KEYBITS
      );
      jsonParams = {
        jData: encryptData,
        jKey: CryptoJS.SHA256(apiKey.serverKey).toString()
      };
    } else {
      jsonParams = {
        jData: "",
        jKey: CryptoJS.SHA256(apiKey.serverKey).toString()
      };
    }
    bodyData = postData(jsonParams);
  } else {
    bodyData = postData("");
  }
  //console.log(bodyData);
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      data: bodyData,
      url: RESTURL + uri,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(response => {
        //console.log(uri);
        console.log(response.data);
        resolve(response.data);
      })
      .catch(err => {
        //console.log(err);
        reject(new Error("Request not Successful"));
      });
  });
};
