import { Base64 } from "js-base64";
import * as NodeRSA from "node-rsa";

export const encrypt = (
  src: any,
  publicKey: NodeRSA.Key,
  keySize: number
): string => {
  let encryptedString: string = "";
  if (publicKey != "") {
    let format: NodeRSA.Format = "pkcs8-public-pem";
    let options: NodeRSA.Options = {
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
      encryptedString += encryptToSend.encrypt(bytes).toString("base64"); //Base64.encode(bytes);
      encryptedString += "\n";
    }
  }
  return Base64.encode(encryptedString);
};

export const decrypt = (src: any, privateKey: NodeRSA.Key): string => {
  var plainText: string = "";
  let format: NodeRSA.Format = "pkcs8-private-pem";
  let options: NodeRSA.Options = {
    encryptionScheme: "pkcs1"
  };
  var crypt = new NodeRSA(privateKey, format, options);

  var encryptedText = Base64.decode(src);
  var encryptArray = encryptedText.split("\n");

  for (var i = 0; i < encryptArray.length; i = i + 1) {
    var block = encryptArray[i];
    if (block != "") {
      plainText += crypt.decrypt(block);
    }
  }
  return plainText;
};
