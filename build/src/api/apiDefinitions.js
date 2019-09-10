(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RestApiUri;
    (function (RestApiUri) {
        RestApiUri["PlaceBOOrder"] = "user/bo/placeorder";
        RestApiUri["OrderBook"] = "OrderBook";
        RestApiUri["ExitOrder"] = "ExecuteExitOrder";
        RestApiUri["CancelOrder"] = "Cancelorder";
        RestApiUri["ModifyOrder"] = "ModifyOrder";
        RestApiUri["LoadGroupCash"] = "LoadGroupCash";
        RestApiUri["LoadInstrument"] = "LoadInstrument";
        RestApiUri["ScripSearch"] = "Scripsearch";
        RestApiUri["LoadScrips"] = "LoadScrips";
        RestApiUri["LoadDate"] = "LoadDate";
        RestApiUri["LoadOption"] = "LoadOption";
        RestApiUri["LoadStrikePrice"] = "LoadStrikePrice";
        RestApiUri["LoadLotSize"] = "LoadLotSize";
        RestApiUri["ValidPwd"] = "ValidPwd";
        RestApiUri["ValidAns"] = "ValidAns";
        RestApiUri["DefaultLogin"] = "DefaultLogin";
        RestApiUri["LoadRetentionType"] = "LoadRetentionType";
        RestApiUri["GetInitialKey"] = "GetInitialKey";
        RestApiUri["Login2FA"] = "Login2FA";
        RestApiUri["GetPreAuthenticationKey"] = "GetPreAuthenticationKey";
        RestApiUri["MWList"] = "MWList";
        RestApiUri["MarketWatch"] = "MarketWatch";
        RestApiUri["GetLotWeight"] = "GetLotWeight";
        RestApiUri["PlaceOrder"] = "PlaceOrder";
        RestApiUri["ConfirmMsg"] = "ConfirmMsg";
        RestApiUri["TradeBook"] = "TradeBook";
        RestApiUri["PositionBook"] = "PositionBook";
        RestApiUri["Limits"] = "Limits";
        RestApiUri["OrderHistory"] = "OrderHistory";
        RestApiUri["ShowQuote"] = "ShowQuote";
        RestApiUri["Logout"] = "Logout";
    })(RestApiUri = exports.RestApiUri || (exports.RestApiUri = {}));
});
//# sourceMappingURL=apiDefinitions.js.map