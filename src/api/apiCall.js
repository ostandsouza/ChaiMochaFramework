"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var CryptoJS = require("crypto-js");
var encrypt_decrypt_1 = require("./encrypt-decrypt");
var keyexchange_1 = require("./keyexchange");
var constants_1 = require("./constants");
exports.restApiCall = function (uri, data, apiKey) {
    var jsonParams;
    var bodyData = "";
    if (apiKey !== undefined) {
        if (data !== undefined) {
            var encryptData = encrypt_decrypt_1.encrypt(JSON.stringify(data), apiKey.serverKey, constants_1.KEYBITS);
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
    //console.log(bodyData);
    return new Promise(function (resolve, reject) {
        axios_1["default"]({
            method: "POST",
            data: bodyData,
            url: constants_1.RESTURL + uri,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
            .then(function (response) {
            //console.log(uri);
            console.log(response.data);
            resolve(response.data);
        })["catch"](function (err) {
            //console.log(err);
            reject(new Error("Request not Successful"));
        });
    });
};
