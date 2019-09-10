"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ExecuteApiSchema = new mongoose_1.Schema({
    api: {
        type: [String],
        required: true
    },
    execute: {
        type: Boolean,
        required: true
    }
    //  },
    //  tcount:{
    //     type: Number
    //     //required: true
    //  }
});
exports.ExecuteApi = mongoose_1.model('ExecuteApi', ExecuteApiSchema, 'ExecuteApi');
var Login2FASchema = new mongoose_1.Schema({
    Lcount: {
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    actid: {
        type: String,
        required: true
    }
});
exports.Login2FAApi = mongoose_1.model('Login2FAApi', Login2FASchema, 'Login2FAApi');
var PwdAuthSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    pwd: {
        type: String,
        required: true
    },
    Source: {
        type: String,
        "default": "MOB"
    },
    Imei: {
        type: String,
        required: true
    },
    apk: {
        type: String,
        required: true
    },
    ftl: {
        type: String,
        required: true
    }
});
exports.PwdAuthApi = mongoose_1.model('PwdAuthApi', PwdAuthSchema, 'PwdAuthApi');
var AnsValidationSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    Count: {
        type: Number,
        required: true,
        "default": 2
    },
    as: {
        type: String,
        required: true
    },
    is: {
        type: String,
        required: true
    }
});
exports.AnsValidationApi = mongoose_1.model('AnsValidationApi', AnsValidationSchema, 'AnsValidationApi');
var DefaultLoginSchema = new mongoose_1.Schema({
    uid: Login2FASchema
});
exports.DefaultLoginApi = mongoose_1.model('DefaultLoginApi', DefaultLoginSchema, 'DefaultLoginApi');
var MWListSchema = new mongoose_1.Schema({
    uid: Login2FASchema
});
exports.MWListApi = mongoose_1.model('MWListApi', MWListSchema, 'MWListApi');
var MWSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    Mwname: {
        type: String,
        required: true
    }
});
exports.MWApi = mongoose_1.model('MWApi', MWSchema, 'MWApi');
var GetLotwgtsSchema = new mongoose_1.Schema({
    uid: Login2FASchema
});
exports.GetLotwgts = mongoose_1.model('GetLotwgts', GetLotwgtsSchema, 'GetLotwgts');
var LoadRetentionSchema = new mongoose_1.Schema({
    Exchange: {
        type: String,
        required: true
    }
});
exports.LoadRetentionApi = mongoose_1.model('LoadRetentionApi', LoadRetentionSchema, 'LoadRetentionApi');
var PlaceOrderSchema = new mongoose_1.Schema({
    s_prdt_ali: {
        type: String,
        required: true
    },
    uid: Login2FASchema,
    actid: Login2FASchema,
    Tsym: {
        type: String,
        required: true
    },
    exch: {
        type: String,
        required: true
    },
    Ttranstype: {
        type: String,
        required: true
    },
    Ret: {
        type: String,
        required: true
    },
    prctyp: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    discqty: {
        type: String,
        required: true
    },
    MktPro: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    TrigPrice: {
        type: String,
        required: true
    },
    Pcode: {
        type: String,
        required: true
    },
    DateDays: {
        type: String,
        required: true
    },
    AMO: {
        type: String,
        required: true
    },
    PosSquareFlg: {
        type: String,
        required: true
    }
});
exports.PlaceOrderApi = mongoose_1.model('PlaceOrderApi', PlaceOrderSchema, 'PlaceOrderApi');
var OrderConfirmationSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    Exchange: {
        type: String,
        required: true
    },
    TradSym: {
        type: String,
        required: true
    }
});
exports.OrderConfirmationApi = mongoose_1.model('OrderConfirmationApi', OrderConfirmationSchema, 'OrderConfirmationApi');
var OrderBookSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    s_prdt_ali: {
        type: String,
        required: true
    }
});
exports.OrderBookApi = mongoose_1.model('OrderBookApi', OrderBookSchema, 'OrderBookApi');
var TradeBookSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    s_prdt_ali: {
        type: String,
        required: true
    }
});
exports.TradeBookApi = mongoose_1.model('TradeBookApi', TradeBookSchema, 'TradeBookApi');
var PositionBookSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    actid: {
        type: String,
        required: true
    },
    TradSym: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    s_prdt_ali: {
        type: String,
        required: true
    }
});
exports.PositionBookApi = mongoose_1.model('PositionBookApi', PositionBookSchema, 'PositionBookApi');
var LimitsSchema = new mongoose_1.Schema({
    uid: Login2FASchema,
    actid: {
        type: String,
        required: true
    },
    segment: {
        type: String,
        required: true
    }
});
exports.LimitsApi = mongoose_1.model('LimitsApi', LimitsSchema, 'LimitsApi');
