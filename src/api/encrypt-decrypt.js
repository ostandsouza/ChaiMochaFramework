"use strict";
exports.__esModule = true;
var js_base64_1 = require("js-base64");
var NodeRSA = require("node-rsa");
exports.encrypt = function (src, publicKey, keySize) {
    var encryptedString = "";
    if (publicKey != "") {
        var format = "pkcs8-public-pem";
        var options = {
            encryptionScheme: "pkcs1"
        };
        var encryptToSend = new NodeRSA(publicKey, format, options);
        var numberOfBytes = keySize / 8 - 11;
        var start = 0;
        var end = numberOfBytes;
        if (numberOfBytes > src.length) {
            end = src.length;
        }
        do {
            var bytes = src.substring(start, end);
            encryptedString += encryptToSend.encrypt(bytes).toString("base64");
            encryptedString += "\n";
            start = end;
            end = end + numberOfBytes;
            if (end > src.length) {
                end = src.length;
            }
        } while (end < src.length);
        if (end - start > 0) {
            var bytes = src.substring(start, end);
            encryptedString += encryptToSend.encrypt(bytes).toString("base64"); //Base64.encode(bytes);
            encryptedString += "\n";
        }
    }
    return js_base64_1.Base64.encode(encryptedString);
};
exports.decrypt = function (src, privateKey) {
    var plainText = "";
    var format = "pkcs8-private-pem";
    var options = {
        encryptionScheme: "pkcs1"
    };
    var crypt = new NodeRSA(privateKey, format, options);
    var encryptedText = js_base64_1.Base64.decode(src);
    var encryptArray = encryptedText.split("\n");
    for (var i = 0; i < encryptArray.length; i = i + 1) {
        var block = encryptArray[i];
        if (block != "") {
            plainText += crypt.decrypt(block);
        }
    }
    return plainText;
};
