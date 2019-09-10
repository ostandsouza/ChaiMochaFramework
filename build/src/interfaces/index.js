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
    var LTPATP;
    (function (LTPATP) {
        LTPATP["LTP"] = "LTP";
        LTPATP["ATP"] = "ATP";
    })(LTPATP = exports.LTPATP || (exports.LTPATP = {}));
    var ABSOLUTE_TICKS;
    (function (ABSOLUTE_TICKS) {
        ABSOLUTE_TICKS["ABSOLUTE"] = "ABSOLUTE";
        ABSOLUTE_TICKS["TICKS"] = "TICKS";
    })(ABSOLUTE_TICKS = exports.ABSOLUTE_TICKS || (exports.ABSOLUTE_TICKS = {}));
});
//# sourceMappingURL=index.js.map