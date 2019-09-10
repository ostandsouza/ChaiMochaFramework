(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "js-base64", "node-rsa"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const js_base64_1 = require("js-base64");
    const NodeRSA = require("node-rsa");
    exports.encrypt = (src, publicKey, keySize) => {
        let encryptedString = "";
        if (publicKey != "") {
            let format = "pkcs8-public-pem";
            let options = {
                encryptionScheme: "pkcs1"
            };
            let encryptToSend = new NodeRSA(publicKey, format, options);
            let numberOfBytes = keySize / 8 - 11;
            let start = 0;
            let end = numberOfBytes;
            if (numberOfBytes > src.length) {
                end = src.length;
            }
            do {
                let bytes = src.substring(start, end);
                encryptedString += encryptToSend.encrypt(bytes).toString("base64");
                encryptedString += "\n";
                start = end;
                end = end + numberOfBytes;
                if (end > src.length) {
                    end = src.length;
                }
            } while (end < src.length);
            if (end - start > 0) {
                let bytes = src.substring(start, end);
                encryptedString += encryptToSend.encrypt(bytes).toString("base64");
                encryptedString += "\n";
            }
        }
        return js_base64_1.Base64.encode(encryptedString);
    };
    exports.decrypt = (src, privateKey) => {
        var plainText = "";
        let format = "pkcs8-private-pem";
        let options = {
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
});
//# sourceMappingURL=encrypt-decrypt.js.map