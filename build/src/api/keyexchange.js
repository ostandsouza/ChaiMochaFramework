(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "node-rsa", "crypto-js", "./encrypt-decrypt", "./apiCall", "./constants", "./apiDefinitions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const axios_1 = require("axios");
    const NodeRSA = require("node-rsa");
    const CryptoJS = require("crypto-js");
    const encrypt_decrypt_1 = require("./encrypt-decrypt");
    const apiCall_1 = require("./apiCall");
    const constants_1 = require("./constants");
    const apiDefinitions_1 = require("./apiDefinitions");
    exports.restApiCallNoEncryption = (uri, data) => {
        return new Promise((resolve, reject) => {
            axios_1.default({
                method: "POST",
                data: data,
                url: constants_1.RESTURL + uri,
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
    exports.postData = (data) => {
        let postData = "";
        if (data != undefined) {
            for (let objKey in data) {
                postData += objKey + "=" + data[objKey] + "&";
            }
        }
        postData = postData.substring(0, postData.length - 1);
        return postData;
    };
    exports.getInitialKey = async () => {
        let response;
        try {
            response = await apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.GetInitialKey);
        }
        catch (_a) {
            throw new Error("Initial Key Fetch Failed");
        }
        return response;
    };
    exports.getKeyPair = () => {
        let genKeys = new NodeRSA({ b: 256 });
        genKeys.generateKeyPair(256);
        let publicKey = genKeys.exportKey("pkcs8-public");
        let privateKey = genKeys.exportKey("pkcs8-private");
        return {
            publicKey: publicKey,
            privateKey: privateKey
        };
    };
    exports.getPreAuthKey = async (serverKey, clientKey) => {
        let response;
        try {
            let sendData = {
                jKey: CryptoJS.SHA256(serverKey).toString(),
                jData: encrypt_decrypt_1.encrypt(clientKey.publicKey, serverKey, constants_1.KEYBITS)
            };
            response = await exports.restApiCallNoEncryption(apiDefinitions_1.RestApiUri.GetPreAuthenticationKey, exports.postData(sendData));
        }
        catch (err) {
            throw new Error("Pre Auth Key Fetch Failed");
        }
        return response;
    };
});
//# sourceMappingURL=keyexchange.js.map