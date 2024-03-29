"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var axios_1 = require("axios");
var NodeRSA = require("node-rsa");
var CryptoJS = require("crypto-js");
var encrypt_decrypt_1 = require("./encrypt-decrypt");
var apiCall_1 = require("./apiCall");
var constants_1 = require("./constants");
var apiDefinitions_1 = require("./apiDefinitions");
exports.restApiCallNoEncryption = function (uri, data) {
    return new Promise(function (resolve, reject) {
        axios_1["default"]({
            method: "POST",
            data: data,
            url: constants_1.RESTURL + uri,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
            .then(function (response) {
            console.log(uri);
            console.log(response.data);
            resolve(response.data);
        })["catch"](function (err) {
            reject(new Error("Request not Successful"));
        });
    });
};
exports.postData = function (data) {
    var postData = "";
    if (data != undefined) {
        for (var objKey in data) {
            postData += objKey + "=" + data[objKey] + "&";
        }
    }
    postData = postData.substring(0, postData.length - 1);
    return postData;
};
exports.getInitialKey = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.GetInitialKey)];
            case 1:
                response = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                throw new Error("Initial Key Fetch Failed");
            case 3: return [2 /*return*/, response];
        }
    });
}); };
exports.getKeyPair = function () {
    var genKeys = new NodeRSA({ b: 256 });
    genKeys.generateKeyPair(256);
    var publicKey = genKeys.exportKey("pkcs8-public");
    var privateKey = genKeys.exportKey("pkcs8-private");
    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
};
exports.getPreAuthKey = function (serverKey, clientKey) { return __awaiter(_this, void 0, void 0, function () {
    var response, sendData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sendData = {
                    jKey: CryptoJS.SHA256(serverKey).toString(),
                    jData: encrypt_decrypt_1.encrypt(clientKey.publicKey, serverKey, constants_1.KEYBITS)
                };
                return [4 /*yield*/, exports.restApiCallNoEncryption(apiDefinitions_1.RestApiUri.GetPreAuthenticationKey, exports.postData(sendData))];
            case 1:
                response = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                throw new Error("Pre Auth Key Fetch Failed");
            case 3: return [2 /*return*/, response];
        }
    });
}); };
