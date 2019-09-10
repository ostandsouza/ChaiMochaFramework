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
    const mongoose = require("mongoose");
    exports.MongoConn = (_done) => {
        exports.connection = mongoose.connect('mongodb://localhost:27017/RestApi', { useNewUrlParser: true }, (error => {
            if (!error) {
                console.log("conntection made successfull to", mongoose.connection.db.databaseName);
                _done();
            }
            else
                console.log("conntection error:", error);
        }));
        return exports.connection;
    };
});
//# sourceMappingURL=mongo.js.map