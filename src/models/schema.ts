import { Schema, model } from "mongoose";
import { connection } from './mongo';

 const ExecuteApiSchema = new Schema({
     api:{
         type: [String],
         required: true,
     },
     execute:{
        type: Boolean,
        required: true,
        //default: false
     }      
    //  },
    //  tcount:{
    //     type: Number
    //     //required: true
    //  }
 });
 export const ExecuteApi = model('ExecuteApi', ExecuteApiSchema,'ExecuteApi');

 const Login2FASchema = new Schema({
    Lcount:{
        type: Number,
        required: true
    },
    uid:{
       type: String,
       required: true,
    },
    actid:{
        type: String,
        required: true,
    }
});

export const Login2FAApi = model('Login2FAApi', Login2FASchema,'Login2FAApi');

const PwdAuthSchema = new Schema({
    uid:Login2FASchema,
    pwd:{
       type: String,
       required: true,
    },
    Source:{
        type: String,
        default: "MOB"
    },
    Imei:{
        type: String,
        required: true,
    },
    apk:{
        type: String,
        required: true,
    },
    ftl:{
        type: String,
        required: true,
        //default: "N"
    },
});

export const PwdAuthApi = model('PwdAuthApi', PwdAuthSchema,'PwdAuthApi');

 const AnsValidationSchema = new Schema({
    uid:Login2FASchema,
    Count:{
        type: Number,
        required: true,
        default: 2
    },
    as:{
       type: String,
       required: true,
    },
    is:{
        type: String,
        required: true,
     }
});

export const AnsValidationApi = model('AnsValidationApi', AnsValidationSchema,'AnsValidationApi');

const DefaultLoginSchema = new Schema({
    uid:Login2FASchema
});

export const DefaultLoginApi = model('DefaultLoginApi', DefaultLoginSchema,'DefaultLoginApi');

const MWListSchema = new Schema({
    uid:Login2FASchema
});

export const MWListApi = model('MWListApi', MWListSchema,'MWListApi');

const MWSchema = new Schema({
    uid:Login2FASchema,
    Mwname:{
        type: String,
        required: true,
     }
});

export const MWApi = model('MWApi', MWSchema,'MWApi');

const GetLotwgtsSchema = new Schema({
    uid:Login2FASchema
});

export const GetLotwgts = model('GetLotwgts', GetLotwgtsSchema,'GetLotwgts');

const LoadRetentionSchema = new Schema({
    Exchange:{
        type: String,
        required: true,
    }
});

export const LoadRetentionApi = model('LoadRetentionApi', LoadRetentionSchema,'LoadRetentionApi');

const PlaceOrderSchema = new Schema({
    s_prdt_ali:{
        type: String,
        required: true,
    },
    uid:Login2FASchema,
    actid:Login2FASchema,
    Tsym:{
        type: String,
        required: true,
    },
    exch:{
        type: String,
        required: true,
    },
    Ttranstype:{
        type: String,
        required: true,
    },
    Ret:{
        type: String,
        required: true,
    },
    prctyp:{
        type: String,
        required: true,
    },
    qty:{
        type: String,
        required: true,
    },
    discqty:{
        type: String,
        required: true,
    },
    MktPro:{
        type: String,
        required: true,
    },
    Price:{
        type: String,
        required: true,
    },
    TrigPrice:{
        type: String,
        required: true,
    },
    Pcode:{
        type: String,
        required: true,
    },
    DateDays:{
        type: String,
        required: true,
    },
    AMO:{
        type: String,
        required: true,
    },
    PosSquareFlg:{
        type: String,
        required: true,
    },
});

export const PlaceOrderApi = model('PlaceOrderApi', PlaceOrderSchema,'PlaceOrderApi');

const OrderConfirmationSchema = new Schema({
    uid:Login2FASchema,
    Exchange:{
        type: String,
        required: true,
    },
    TradSym:{
        type: String,
        required: true,
    }
});

export const OrderConfirmationApi = model('OrderConfirmationApi', OrderConfirmationSchema,'OrderConfirmationApi');

const OrderBookSchema = new Schema({
    uid:Login2FASchema,
    s_prdt_ali:{
        type: String,
        required: true,
    }
});

export const OrderBookApi = model('OrderBookApi', OrderBookSchema,'OrderBookApi');

const TradeBookSchema = new Schema({
    uid:Login2FASchema,
    s_prdt_ali:{
        type: String,
        required: true,
    }
});

export const TradeBookApi = model('TradeBookApi', TradeBookSchema,'TradeBookApi');

const PositionBookSchema = new Schema({
    uid:Login2FASchema,
    actid:{
        type: String,
        required: true,
    },
    TradSym:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    s_prdt_ali:{
        type: String,
        required: true,
    }
});

export const PositionBookApi = model('PositionBookApi', PositionBookSchema,'PositionBookApi');

const LimitsSchema = new Schema({
    uid:Login2FASchema,
    actid:{
        type: String,
        required: true,
    },
    segment:{
        type: String,
        required: true,
    }
});

export const LimitsApi = model('LimitsApi', LimitsSchema,'LimitsApi');

