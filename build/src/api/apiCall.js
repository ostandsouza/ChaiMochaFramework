(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "crypto-js", "./encrypt-decrypt", "./keyexchange", "./constants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const axios_1 = require("axios");
    const CryptoJS = require("crypto-js");
    const encrypt_decrypt_1 = require("./encrypt-decrypt");
    const keyexchange_1 = require("./keyexchange");
    const constants_1 = require("./constants");
    exports.restApiCall = (uri, data, apiKey) => {
        let jsonParams;
        let bodyData = "";
        if (apiKey !== undefined) {
            if (data !== undefined) {
                let encryptData = encrypt_decrypt_1.encrypt(JSON.stringify(data), apiKey.serverKey, constants_1.KEYBITS);
                jsonParams = {
                    jData: encryptData,
                    jKey: CryptoJS.SHA256(apiKey.serverKey).toString()
                };
            }
            else {
                jsonParams = {
                    jData: "",
                    jKey: CryptoJS.SHA256(apiKey.serverKey).toString()
                };
            }
            bodyData = keyexchange_1.postData(jsonParams);
        }
        else {
            bodyData = keyexchange_1.postData("");
        }
        return new Promise((resolve, reject) => {
            axios_1.default({
                method: "POST",
                data: bodyData,
                url: constants_1.RESTURL + uri,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
                .then(response => {
                console.log(response.data);
                resolve(response.data);
            })
                .catch(err => {
                reject(new Error("Request not Successful"));
            });
        });
    };
});
//# sourceMappingURL=apiCall.js.map