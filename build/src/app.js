(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./models/schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mSchema = require("./models/schema");
    exports.getExecuteApi = async () => {
        let Count;
        var response = "";
        await mSchema.ExecuteApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.ExecuteApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getLogin2FAApi = async () => {
        let Count;
        var response = "";
        await mSchema.Login2FAApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.Login2FAApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getPwdAuthApi = async () => {
        let Count;
        var response = "";
        await mSchema.PwdAuthApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.PwdAuthApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getAnsValidationApi = async () => {
        let Count;
        var response = "";
        await mSchema.AnsValidationApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.AnsValidationApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getMWApi = async () => {
        let Count;
        var response = "";
        await mSchema.MWApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.MWApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getLoadRetentionTypeApi = async () => {
        let Count;
        var response = "";
        await mSchema.LoadRetentionApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.LoadRetentionApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getPlaceOrderApi = async () => {
        let Count;
        var response = "";
        await mSchema.PlaceOrderApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.PlaceOrderApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getPositionBookApi = async () => {
        let Count;
        var response = "";
        await mSchema.PositionBookApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.PositionBookApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
    exports.getLimitsApi = async () => {
        let Count;
        var response = "";
        await mSchema.LimitsApi.estimatedDocumentCount().then(function (result) {
            Count = result;
        }).catch(err => {
            console.log("Count not Successful");
        });
        return new Promise(async (resolve, reject) => {
            await mSchema.LimitsApi.find().then(function (doc) {
                response = doc.pop();
                resolve(response);
            }).catch(err1 => {
                console.log("tcount not Successful", err1);
                reject(new Error("Request not Successful"));
            });
        });
    };
});
//# sourceMappingURL=app.js.map