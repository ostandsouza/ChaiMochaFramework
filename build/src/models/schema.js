(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongoose"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mongoose_1 = require("mongoose");
    const ExecuteApiSchema = new mongoose_1.Schema({
        api: {
            type: [String],
            required: true,
        },
        execute: {
            type: Boolean,
            required: true,
        }
    });
    exports.ExecuteApi = mongoose_1.model('ExecuteApi', ExecuteApiSchema, 'ExecuteApi');
    const Login2FASchema = new mongoose_1.Schema({
        Lcount: {
            type: Number,
            required: true
        },
        uid: {
            type: String,
            required: true,
        },
        actid: {
            type: String,
            required: true,
        }
    });
    exports.Login2FAApi = mongoose_1.model('Login2FAApi', Login2FASchema, 'Login2FAApi');
    const PwdAuthSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        pwd: {
            type: String,
            required: true,
        },
        Source: {
            type: String,
            default: "MOB"
        },
        Imei: {
            type: String,
            required: true,
        },
        apk: {
            type: String,
            required: true,
        },
        ftl: {
            type: String,
            required: true,
        },
    });
    exports.PwdAuthApi = mongoose_1.model('PwdAuthApi', PwdAuthSchema, 'PwdAuthApi');
    const AnsValidationSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        Count: {
            type: Number,
            required: true,
            default: 2
        },
        as: {
            type: String,
            required: true,
        },
        is: {
            type: String,
            required: true,
        }
    });
    exports.AnsValidationApi = mongoose_1.model('AnsValidationApi', AnsValidationSchema, 'AnsValidationApi');
    const DefaultLoginSchema = new mongoose_1.Schema({
        uid: Login2FASchema
    });
    exports.DefaultLoginApi = mongoose_1.model('DefaultLoginApi', DefaultLoginSchema, 'DefaultLoginApi');
    const MWListSchema = new mongoose_1.Schema({
        uid: Login2FASchema
    });
    exports.MWListApi = mongoose_1.model('MWListApi', MWListSchema, 'MWListApi');
    const MWSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        Mwname: {
            type: String,
            required: true,
        }
    });
    exports.MWApi = mongoose_1.model('MWApi', MWSchema, 'MWApi');
    const GetLotwgtsSchema = new mongoose_1.Schema({
        uid: Login2FASchema
    });
    exports.GetLotwgts = mongoose_1.model('GetLotwgts', GetLotwgtsSchema, 'GetLotwgts');
    const LoadRetentionSchema = new mongoose_1.Schema({
        Exchange: {
            type: String,
            required: true,
        }
    });
    exports.LoadRetentionApi = mongoose_1.model('LoadRetentionApi', LoadRetentionSchema, 'LoadRetentionApi');
    const PlaceOrderSchema = new mongoose_1.Schema({
        s_prdt_ali: {
            type: String,
            required: true,
        },
        uid: Login2FASchema,
        actid: Login2FASchema,
        Tsym: {
            type: String,
            required: true,
        },
        exch: {
            type: String,
            required: true,
        },
        Ttranstype: {
            type: String,
            required: true,
        },
        Ret: {
            type: String,
            required: true,
        },
        prctyp: {
            type: String,
            required: true,
        },
        qty: {
            type: String,
            required: true,
        },
        discqty: {
            type: String,
            required: true,
        },
        MktPro: {
            type: String,
            required: true,
        },
        Price: {
            type: String,
            required: true,
        },
        TrigPrice: {
            type: String,
            required: true,
        },
        Pcode: {
            type: String,
            required: true,
        },
        DateDays: {
            type: String,
            required: true,
        },
        AMO: {
            type: String,
            required: true,
        },
        PosSquareFlg: {
            type: String,
            required: true,
        },
    });
    exports.PlaceOrderApi = mongoose_1.model('PlaceOrderApi', PlaceOrderSchema, 'PlaceOrderApi');
    const OrderConfirmationSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        Exchange: {
            type: String,
            required: true,
        },
        TradSym: {
            type: String,
            required: true,
        }
    });
    exports.OrderConfirmationApi = mongoose_1.model('OrderConfirmationApi', OrderConfirmationSchema, 'OrderConfirmationApi');
    const OrderBookSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        s_prdt_ali: {
            type: String,
            required: true,
        }
    });
    exports.OrderBookApi = mongoose_1.model('OrderBookApi', OrderBookSchema, 'OrderBookApi');
    const TradeBookSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        s_prdt_ali: {
            type: String,
            required: true,
        }
    });
    exports.TradeBookApi = mongoose_1.model('TradeBookApi', TradeBookSchema, 'TradeBookApi');
    const PositionBookSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        actid: {
            type: String,
            required: true,
        },
        TradSym: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        s_prdt_ali: {
            type: String,
            required: true,
        }
    });
    exports.PositionBookApi = mongoose_1.model('PositionBookApi', PositionBookSchema, 'PositionBookApi');
    const LimitsSchema = new mongoose_1.Schema({
        uid: Login2FASchema,
        actid: {
            type: String,
            required: true,
        },
        segment: {
            type: String,
            required: true,
        }
    });
    exports.LimitsApi = mongoose_1.model('LimitsApi', LimitsSchema, 'LimitsApi');
});
//# sourceMappingURL=schema.js.map