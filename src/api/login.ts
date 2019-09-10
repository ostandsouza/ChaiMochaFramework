import { restApiCall } from "./apiCall";
import { ApiKey, Login } from "../interfaces";
import * as CryptoJS from "crypto-js";
import { decrypt } from "./encrypt-decrypt";
import { RestApiUri } from "./apiDefinitions";

let productAlias: Map<string, string> = new Map();
export const orderTypeMap: Map<string, string> = new Map();
orderTypeMap.set("L", "LIMIT");
orderTypeMap.set("SL", "STOPLOSS");
orderTypeMap.set("MKT", "MARKET");
orderTypeMap.set("MTL", "MARKETTOLIMIT");
orderTypeMap.set("SL-M", "STOPLOSSMARKET");
//orderTypeMap.set('AU', 'AUCTION');

export const segmentsMap: Map<string, string> = new Map();
export const exchangesMap: Map<string, string> = new Map();

export const login = async (
  user: string,
  password: string,
  ans1: string,
  ans2: string,
  apiKey: ApiKey
): Promise<Login> => {
  try {
    await restApiCall(
      RestApiUri.Login2FA,
      {
        uid: user
      },
      apiKey
    );

    let hash: any = CryptoJS.SHA256(password);
    for (let i = 1; i <= 999; i++) {
      hash = CryptoJS.SHA256(hash);
    }
    let finalhash: string = hash.toString();

    let validatePwd = await restApiCall(
      RestApiUri.ValidPwd,
      {
        uid: user,
        pwd: finalhash,
        ftl: "N",
        apk: "0.0.0.0",
        Imei: "12345678"
      },
      apiKey
    );
    let validAns = await restApiCall(
      RestApiUri.ValidAns,
      {
        uid: user,
        Count: validatePwd.scount,
        as: `${ans1}-${ans2}`,
        is: validatePwd.sIndex.replace("|", "-")
      },
      apiKey
    );

    let decryptValidAns = decrypt(validAns.jEncResp, apiKey.keyPair.privateKey);
    let loginResponse = JSON.parse(decryptValidAns);
    let newServerKey = loginResponse.sUserToken;

    return {
      key: newServerKey,
      loggedIn: true
    };
  } catch (err) {
    console.error(err);
    return {
      key: "",
      loggedIn: false
    };
  }
};

export const loginDefaults = async (
  user: string,
  apiKey: ApiKey
): Promise<any> => {
  try {
    let defaultLogin = await restApiCall(
      RestApiUri.DefaultLogin,
      {
        uid: user
      },
      apiKey
    );
    //console.log(defaultLogin);
    let exchanges = transformExchangesDetails(defaultLogin.exchDeatil);
    let orderTypes = transformOrderTypes(defaultLogin.orarr);

    return {
      exchanges,
      orderTypes,
      account: defaultLogin.sAccountId,
      productAlias: defaultLogin.s_prdt_ali
    };
  } catch (err) {
    console.log(err);
    return {
      exchanges: [],
      orderTypes: []
    };
  }
};

export const loadRetentions = async (
  exchangeSeg: string,
  apiKey: ApiKey
): Promise<any> => {
  try {
    let retentions = await restApiCall(
      RestApiUri.LoadRetentionType,
      {
        Exchange: exchangesMap.get(exchangeSeg)
      },
      apiKey
    );

    return {
      retentions: retentions.Ret.reduce((obj: any, value: any) => {
        return [
          ...obj,
          {
            label: value,
            id: value
          }
        ];
      }, [])
    };
  } catch {
    return {
      retentions: []
    };
  }
};

const transformExchangesDetails = (exchangeDetail: any) => {
  //console.log(exchangeDetail);
  let exchangesOnly = Object.keys(exchangeDetail).map(k => {
    exchangeDetail[k].map((obj: any) => {
      segmentsMap.set(obj.exch, k);
    });

    return exchangeDetail[k];
  });

  let exchangeOnly = [].concat(...exchangesOnly).filter((k: any) => {
    return k.product.includes("BRACKET");
  });

  let exchanges = exchangeOnly.reduce((obj, value: any) => {
    exchangesMap.set(value.exch, value.exchseg);
    exchangesMap.set(value.exchseg, value.exch);
    return [
      ...obj,
      {
        label: value.exch,
        id: value.exchseg
      }
    ];
  }, []);

  return exchanges;
};

const transformOrderTypes = (orderTypesArray: any) => {
  let orderTypes = orderTypesArray.reduce((obj: any, value: any) => {
    let displayString =
      orderTypeMap.get(value) == undefined ? value : orderTypeMap.get(value);
    return [
      ...obj,
      {
        label: displayString,
        id: value
      }
    ];
  }, []);
  return orderTypes;
};
