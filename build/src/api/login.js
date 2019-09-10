(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./apiCall", "crypto-js", "./encrypt-decrypt", "./apiDefinitions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const apiCall_1 = require("./apiCall");
    const CryptoJS = require("crypto-js");
    const encrypt_decrypt_1 = require("./encrypt-decrypt");
    const apiDefinitions_1 = require("./apiDefinitions");
    let productAlias = new Map();
    exports.orderTypeMap = new Map();
    exports.orderTypeMap.set("L", "LIMIT");
    exports.orderTypeMap.set("SL", "STOPLOSS");
    exports.orderTypeMap.set("MKT", "MARKET");
    exports.orderTypeMap.set("MTL", "MARKETTOLIMIT");
    exports.orderTypeMap.set("SL-M", "STOPLOSSMARKET");
    exports.segmentsMap = new Map();
    exports.exchangesMap = new Map();
    exports.login = async (user, password, ans1, ans2, apiKey) => {
        try {
            await apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.Login2FA, {
                uid: user
            }, apiKey);
            let hash = CryptoJS.SHA256(password);
            for (let i = 1; i <= 999; i++) {
                hash = CryptoJS.SHA256(hash);
            }
            let finalhash = hash.toString();
            let validatePwd = await apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ValidPwd, {
                uid: user,
                pwd: finalhash,
                ftl: "N",
                apk: "0.0.0.0",
                Imei: "12345678"
            }, apiKey);
            let validAns = await apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ValidAns, {
                uid: user,
                Count: validatePwd.scount,
                as: `${ans1}-${ans2}`,
                is: validatePwd.sIndex.replace("|", "-")
            }, apiKey);
            let decryptValidAns = encrypt_decrypt_1.decrypt(validAns.jEncResp, apiKey.keyPair.privateKey);
            let loginResponse = JSON.parse(decryptValidAns);
            let newServerKey = loginResponse.sUserToken;
            return {
                key: newServerKey,
                loggedIn: true
            };
        }
        catch (err) {
            console.error(err);
            return {
                key: "",
                loggedIn: false
            };
        }
    };
    exports.loginDefaults = async (user, apiKey) => {
        try {
            let defaultLogin = await apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.DefaultLogin, {
                uid: user
            }, apiKey);
            let exchanges = transformExchangesDetails(defaultLogin.exchDeatil);
            let orderTypes = transformOrderTypes(defaultLogin.orarr);
            return {
                exchanges,
                orderTypes,
                account: defaultLogin.sAccountId,
                productAlias: defaultLogin.s_prdt_ali
            };
        }
        catch (err) {
            console.log(err);
            return {
                exchanges: [],
                orderTypes: []
            };
        }
    };
    exports.loadRetentions = async (exchangeSeg, apiKey) => {
        try {
            let retentions = await apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.LoadRetentionType, {
                Exchange: exports.exchangesMap.get(exchangeSeg)
            }, apiKey);
            return {
                retentions: retentions.Ret.reduce((obj, value) => {
                    return [
                        ...obj,
                        {
                            label: value,
                            id: value
                        }
                    ];
                }, [])
            };
        }
        catch (_a) {
            return {
                retentions: []
            };
        }
    };
    const transformExchangesDetails = (exchangeDetail) => {
        let exchangesOnly = Object.keys(exchangeDetail).map(k => {
            exchangeDetail[k].map((obj) => {
                exports.segmentsMap.set(obj.exch, k);
            });
            return exchangeDetail[k];
        });
        let exchangeOnly = [].concat(...exchangesOnly).filter((k) => {
            return k.product.includes("BRACKET");
        });
        let exchanges = exchangeOnly.reduce((obj, value) => {
            exports.exchangesMap.set(value.exch, value.exchseg);
            exports.exchangesMap.set(value.exchseg, value.exch);
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
    const transformOrderTypes = (orderTypesArray) => {
        let orderTypes = orderTypesArray.reduce((obj, value) => {
            let displayString = exports.orderTypeMap.get(value) == undefined ? value : exports.orderTypeMap.get(value);
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
});
//# sourceMappingURL=login.js.map