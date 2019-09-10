import axios from "axios";
import { Base64 } from "js-base64";
import * as NodeRSA from "node-rsa";
import * as CryptoJS from "crypto-js";
import { encrypt, decrypt } from "./encrypt-decrypt";
import { ApiKey, Params, KeyPair, InitKey, AuthKey } from "../interfaces";
import { restApiCall } from "./apiCall";
import { KEYBITS, RESTURL } from "./constants";
import { RestApiUri } from "./apiDefinitions";

export const restApiCallNoEncryption = (
  uri: RestApiUri,
  data?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      data: data,
      url: RESTURL + uri,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(response => {
        console.log(uri);
        console.log(response.data);
        resolve(response.data);
      })
      .catch(err => {
        reject(new Error("Request not Successful"));
      });
  });
};

export const postData = (data?: any): string => {
  let postData: string = "";
  if (data != undefined) {
    for (let objKey in data) {
      postData += objKey + "=" + data[objKey] + "&";
    }
  }
  postData = postData.substring(0, postData.length - 1);
  return postData;
};

export const getInitialKey = async () => {
  //let initialKey = "";
  let response :InitKey ;
  //console.log(`Initial Key`);
  try {
        response  = await restApiCall(RestApiUri.GetInitialKey);
        //console.log(response);
    //initialKey = Base64.decode(response.publicKey);
  } catch {
    throw new Error("Initial Key Fetch Failed");
  }
  return response;
}

export const getKeyPair = (): KeyPair => {
  let genKeys: NodeRSA = new NodeRSA({ b: 256 });
  genKeys.generateKeyPair(256);

  let publicKey: string = genKeys.exportKey("pkcs8-public");
  let privateKey: string = genKeys.exportKey("pkcs8-private");

  return {
    publicKey: publicKey,
    privateKey: privateKey
  };
};

export const getPreAuthKey = async (serverKey: string, clientKey: KeyPair) => {
  let response : AuthKey;

  try {
    let sendData: Params = {
      jKey: CryptoJS.SHA256(serverKey).toString(),
      jData: encrypt(clientKey.publicKey, serverKey, KEYBITS)
    };

    response = await restApiCallNoEncryption(
      RestApiUri.GetPreAuthenticationKey,
      postData(sendData)
    );

    //preAuthKey = decrypt(response.publicKey3, clientKey.privateKey);
  } catch (err) {
    throw new Error("Pre Auth Key Fetch Failed");
  }
  return response;
};
