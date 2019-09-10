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
var mSchema = require("./models/schema");
exports.getExecuteApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.ExecuteApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.ExecuteApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getLogin2FAApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.Login2FAApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.Login2FAApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getPwdAuthApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.PwdAuthApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.PwdAuthApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getAnsValidationApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.AnsValidationApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.AnsValidationApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getMWApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.MWApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.MWApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getLoadRetentionTypeApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.LoadRetentionApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.LoadRetentionApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getPlaceOrderApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.PlaceOrderApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.PlaceOrderApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getPositionBookApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.PositionBookApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.PositionBookApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
exports.getLimitsApi = function () { return __awaiter(_this, void 0, void 0, function () {
    var Count, response;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = "";
                return [4 /*yield*/, mSchema.LimitsApi.estimatedDocumentCount().then(function (result) {
                        Count = result;
                    })["catch"](function (err) {
                        console.log("Count not Successful");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, mSchema.LimitsApi.find().then(function (doc) {
                                        response = doc.pop();
                                        resolve(response);
                                        //console.log("response",response);
                                    })["catch"](function (err1) {
                                        console.log("tcount not Successful", err1);
                                        reject(new Error("Request not Successful"));
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
