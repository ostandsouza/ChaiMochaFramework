(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../src/models/mongo", "../src/api/keyexchange", "chai", "js-base64", "../src/app", "../src/api/encrypt-decrypt", "../src/api/apiDefinitions", "../src/api/apiCall", "crypto-js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mongo_1 = require("../src/models/mongo");
    const keyexchange_1 = require("../src/api/keyexchange");
    const Chai = require("chai");
    const js_base64_1 = require("js-base64");
    const app_1 = require("../src/app");
    const encrypt_decrypt_1 = require("../src/api/encrypt-decrypt");
    const apiDefinitions_1 = require("../src/api/apiDefinitions");
    const apiCall_1 = require("../src/api/apiCall");
    const CryptoJS = require("crypto-js");
    let expect = Chai.expect;
    let assert = Chai.assert;
    before(function (done) {
        exports.conn = mongo_1.MongoConn(done);
    });
    let initialKey;
    let preAuthKey;
    let ApiList;
    let Userid;
    let UserPwd;
    let User2FAAns;
    let apiKey;
    let Count;
    let MW;
    let Retention;
    let PlaceOrder;
    let PositionBook;
    let Limits;
    let Value;
    describe('Getting val from DB', () => {
        describe('Getting login details from DB', () => {
            it('Get count from DB:', (done) => {
                app_1.getExecuteApi().then((result) => {
                    Count = result;
                    ApiList = Count.api;
                    console.log("ApiList", ApiList);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get loginID from DB:', (done) => {
                app_1.getLogin2FAApi().then((result) => {
                    Userid = result;
                    Userid.uid = "EXPSLD2";
                    Userid.actid = "EXPSLD2";
                    console.log("LoginID", Userid.uid);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get login pwd from DB:', (done) => {
                app_1.getPwdAuthApi().then((result) => {
                    UserPwd = result;
                    console.log("Loginpwd", UserPwd.pwd);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get 2FA ans from DB:', (done) => {
                app_1.getAnsValidationApi().then((result) => {
                    User2FAAns = result;
                    console.log("2FAans", User2FAAns.as);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get MW details from DB:', (done) => {
                app_1.getMWApi().then((result) => {
                    MW = result;
                    console.log("MWname", MW.Mwname);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get Exchange from DB:', (done) => {
                app_1.getLoadRetentionTypeApi().then((result) => {
                    Retention = result;
                    console.log("Exchange", Retention.Exchange);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get Place order details from DB:', (done) => {
                app_1.getPlaceOrderApi().then((result) => {
                    PlaceOrder = result;
                    console.log("Pcode", PlaceOrder.s_prdt_ali);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get Position Book details from DB:', (done) => {
                app_1.getPositionBookApi().then((result) => {
                    PositionBook = result;
                    console.log("PositionType", PositionBook.type);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
            it('Get Limits details from DB:', (done) => {
                app_1.getLimitsApi().then((result) => {
                    Limits = result;
                    console.log("Limits Segment", Limits.segment);
                    done();
                }).catch(err => {
                    console.log("err", err);
                });
            });
        });
    });
    describe('automation api test', () => {
        let apil = 'GetInitialKey';
        it('Check testcase', (done) => {
            const lookupTable = {
                'GetInitialKey': function () {
                    describe('getInitialKey api test', () => {
                        let res;
                        it('Check server key is recieved:', (done) => {
                            keyexchange_1.getInitialKey().then(data => {
                                assert.isOk(data.publicKey, "Mode has come");
                                assert.isOk(data.stat, "Stat has come");
                                res = data;
                                done();
                            }).catch(err => {
                                assert.fail("Server Key was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.error).to.be.undefined;
                            done();
                            initialKey = js_base64_1.Base64.decode(res.publicKey);
                        });
                    });
                },
                'GetPreAuthenticationKey': function () {
                    var res;
                    let keyPair;
                    describe('GetPreAuthenticationKey api test', () => {
                        it('Check server key is recieved:', (done) => {
                            keyPair = keyexchange_1.getKeyPair();
                            keyexchange_1.getPreAuthKey(initialKey, keyPair).then(data => {
                                assert.isOk(data.publicKey3, "Mode has come");
                                assert.isOk(data.stat, "Stat has come");
                                res = data;
                                done();
                            }).catch(err => {
                                assert.fail("Server Key was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.error).to.be.undefined;
                            done();
                            preAuthKey = encrypt_decrypt_1.decrypt(res.publicKey3, keyPair.privateKey);
                            const setKey = function ixFactory() {
                                return {
                                    serverKey: preAuthKey,
                                    keyPair: keyPair
                                };
                            };
                            apiKey = setKey();
                        });
                    });
                },
                'Login2FA': function () {
                    describe('Login2FA api test', () => {
                        let res;
                        it('Check Login2FA was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.Login2FA, {
                                uid: Userid.uid
                            }, apiKey).then(result => {
                                assert.isOk(result.imgsrc, "image has come");
                                assert.isOk(result.stat, "Stat has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Failed at Login2FA api");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'ValidPwd': function () {
                    describe('ValidPwd api test', () => {
                        let res;
                        it('Check Pwd Validation was a success:', (done) => {
                            let hash = CryptoJS.SHA256(UserPwd.pwd);
                            for (let i = 1; i <= 999; i++) {
                                hash = CryptoJS.SHA256(hash);
                            }
                            let finalhash = hash.toString();
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ValidPwd, {
                                uid: Userid.uid,
                                pwd: finalhash,
                                ftl: UserPwd.ftl,
                                apk: UserPwd.apk,
                                Imei: UserPwd.Imei
                            }, apiKey).then(result => {
                                assert.isOk(result.scount, "count has come");
                                assert.isOk(result.stat, "Stat has come");
                                assert.isOk(result.sIndex, "index has come");
                                assert.isOk(result.tdata, "tdata has come");
                                assert.isOk(result.sQuestions, "sQuestions has come");
                                assert.isOk(result.PwdRegex, "PwdRegex has come");
                                assert.isOk(result.loginid, "loginid has come");
                                res = result;
                                done();
                            }).catch(err => {
                                console.log(err);
                                assert.fail("Failed at valid pwd api");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                            Value = { sIndex: res.sIndex, scount: res.scount };
                        });
                    });
                },
                'ValidAns': function () {
                    describe('ValidAns api test', () => {
                        let res;
                        let loginResponse;
                        it('Check 2FA Validation was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ValidAns, {
                                uid: Userid.uid,
                                Count: Value.scount,
                                as: `${User2FAAns.as}`,
                                is: Value.scount.replace("|", "-")
                            }, apiKey).then(result => {
                                assert.isOk(result.jEncResp, "tdata has come");
                                let decryptValidAns = encrypt_decrypt_1.decrypt(result.jEncResp, apiKey.keyPair.privateKey);
                                loginResponse = JSON.parse(decryptValidAns);
                                res = loginResponse;
                                console.log("sult", res);
                                done();
                            }).catch(err => {
                                assert.fail("Failed at valid Ans api");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            done();
                            apiKey.serverKey = res.sUserToken;
                        });
                    });
                },
                'DefaultLogin': function () {
                    describe('DefaultLogin api test', () => {
                        let res;
                        it('Check DefaultLogin was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.DefaultLogin, {
                                uid: Userid.uid
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.exarr, "Enabled exchanges has come");
                                assert.isOk(result.orarr, "Enabled order type has come");
                                assert.isOk(result.prarr, "Enabled product type has come");
                                assert.isOk(result.s_prdt_ali, "Product alias has come");
                                assert.isOk(result.sTransFlg, "sTransFlg has come");
                                assert.isOk(result.dmw, "Default market watch name has come");
                                assert.isOk(result.brkname, "Broker name of user has come");
                                assert.isOk(result.brnchid, "Branch id of user has come");
                                assert.isOk(result.MaxMWCount, "MaxMWCount has come");
                                assert.isOk(result.email, "email has come");
                                assert.isOk(result.Weblink, "Weblink has come");
                                assert.isOk(result.sAccountId, "sAccountId has come");
                                assert.isOk(result.exchDeatil, "exchDeatil has come");
                                assert.isOk(result.ltwtEnable, "Lots weight configurable flag has come");
                                assert.isOk(result.pwdSplChar, "Password Special character flag has come");
                                assert.isOk(result.accountName, "accountName has come");
                                assert.isOk(result.userPrivileges, "userPrivileges has come");
                                assert.isOk(result.YSXorderEntry, "YSXorderEntry has come");
                                assert.isOk(result.criteriaAttribute, "criteriaAttribute has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Server Key was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'MWListApi': function () {
                    describe('MWList api test', () => {
                        let res;
                        it('Check get MW list was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.MWList, {
                                uid: Userid.uid
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.values, "values has come");
                                assert.isOk(result.logindefaultmw, "logindefaultmw has come");
                                assert.isOk(result.MaxMWCount, "MaxMWCount has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("MW list was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'MWApi': function () {
                    describe('MW api test', () => {
                        let res;
                        it('Check get MW details was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.MWList, {
                                uid: Userid.uid,
                                Mwname: MW.Mwname
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.values, "MW values has come");
                                assert.isOk(result.logindefaultmw, "logindefaultmw has come");
                                assert.isOk(result.MaxMWCount, "MaxMWCount has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("MW details was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'GetLotwgts': function () {
                    describe('GetLotwgts api test', () => {
                        let res;
                        it('Check get Lot/weights setting was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.GetLotWeight, {
                                uid: Userid.uid
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.LtWt, "LtWt values has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Get Lot/weights was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'LoadRetentionApi': function () {
                    describe('LoadRetention api test', () => {
                        let res;
                        it('Check get Retention type was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.LoadRetentionType, {
                                Exchange: Retention.Exchange
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Ret, "Ret values has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Retention value was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'PlaceOrderApi': function () {
                    describe('PlaceOrderApi test', () => {
                        let res;
                        it('Check Place Order was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.PlaceOrder, {
                                s_prdt_ali: PlaceOrder.s_prdt_ali,
                                uid: Userid.uid,
                                actid: Userid.actid,
                                Tsym: PlaceOrder.Tsym,
                                exch: Retention.Exchange,
                                Ttranstype: PlaceOrder.Ttranstype,
                                Ret: PlaceOrder.Ret,
                                prctyp: PlaceOrder.prctyp,
                                qty: PlaceOrder.qty,
                                discqty: PlaceOrder.discqty,
                                MktPro: PlaceOrder.MktPro,
                                Price: PlaceOrder.Price,
                                TrigPrice: PlaceOrder.TrigPrice,
                                Pcode: PlaceOrder.Pcode,
                                DateDays: PlaceOrder.DateDays,
                                AMO: PlaceOrder.AMO,
                                PosSquareFlg: PlaceOrder.PosSquareFlg
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.NOrdNo, "Order No has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Order was not placed");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                            Value = res.NOrdNo;
                        });
                    });
                },
                'ModifyOrderApi': function () {
                    describe('ModifyOrderApi test', () => {
                        let res;
                        it('Check Modify Order was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ModifyOrder, {
                                uid: Userid.uid,
                                Actid: Userid.actid,
                                Exchangeseg: Retention.Exchange,
                                Tsym: PlaceOrder.Tsym,
                                Nstordno: Value,
                                Transtype: PlaceOrder.Ttranstype,
                                Prctype: PlaceOrder.prctyp,
                                Price: PlaceOrder.Price,
                                Qty: PlaceOrder.qty,
                                Dscqty: PlaceOrder.discqty,
                                Trgprc: PlaceOrder.TrigPrice,
                                Validity: PlaceOrder.Ret,
                                Filledqty: "0",
                                Pcode: PlaceOrder.Pcode,
                                Mktpro: PlaceOrder.MktPro,
                                DateDays: PlaceOrder.DateDays,
                                s_prdt_ali: PlaceOrder.s_prdt_ali
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Result, "Order No has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Order was not Modified");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                            Value = res.NOrdNo;
                        });
                    });
                },
                'CancelOrderApi': function () {
                    describe('CancelOrderApi test', () => {
                        let res;
                        it('Check Cancel Order was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.CancelOrder, {
                                uid: Userid.uid,
                                NestOrd: Value,
                                s_prdt_ali: PlaceOrder.s_prdt_ali
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Result, "Order No has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Order was not Cancelled");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                            Value = res.NOrdNo;
                        });
                    });
                },
                'OrderHistoryApi': function () {
                    describe('OrderHistoryApi test', () => {
                        let res;
                        it('Check Order History was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.OrderHistory, {
                                uid: Userid.uid,
                                NestOrd: Value,
                                s_prdt_ali: PlaceOrder.s_prdt_ali
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Trsym, "Trsym has come");
                                assert.isOk(result.Prc, "Prc has come");
                                assert.isOk(result.Exseg, "Exseg has come");
                                assert.isOk(result.Qty, "Qty has come");
                                assert.isOk(result.Status, "Status has come");
                                assert.isOk(result.Action, "Action has come");
                                assert.isOk(result.Ordtype, "Ordtype has come");
                                assert.isOk(result.PriceNumerator, "PriceNumerator has come");
                                assert.isOk(result.GeneralNumerator, "GeneralNumerator has come");
                                assert.isOk(result.PriceDenomenator, "PriceDenomenator has come");
                                assert.isOk(result.GeneralDenomenator, "GeneralDenomenator has come");
                                assert.isOk(result.bqty, "bqty has come");
                                assert.isOk(result.exchange, "exchange has come");
                                assert.isOk(result.nestordernumber, "nestordernumber has come");
                                assert.isOk(result.nestreqid, "nestreqid has come");
                                assert.isOk(result.symbolname, "symbolname has come");
                                assert.isOk(result.averageprice, "averageprice has come");
                                assert.isOk(result.triggerprice, "triggerprice has come");
                                assert.isOk(result.disclosedqty, "disclosedqty has come");
                                assert.isOk(result.exchangeorderid, "exchangeorderid has come");
                                assert.isOk(result.rejectionreason, "rejectionreason has come");
                                assert.isOk(result.duration, "duration has come");
                                assert.isOk(result.productcode, "productcode has come");
                                assert.isOk(result.reporttype, "reporttype has come");
                                assert.isOk(result.customerfirm, "customerfirm has come");
                                assert.isOk(result.exchangetimestamp, "exchangetimestamp has come");
                                assert.isOk(result.ordersource, "ordersource has come");
                                assert.isOk(result.filldateandtime, "filldateandtime has come");
                                assert.isOk(result.ordergenerationtype, "ordergenerationtype has come");
                                assert.isOk(result.scripname, "scripname has come");
                                assert.isOk(result.legorderindicator, "legorderindicator has come");
                                assert.isOk(result.filledShares, "filledShares has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Order History was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'OrderConfirmationApi': function () {
                    describe('Order Confirmation api test', () => {
                        let res;
                        it('Check get Order Confirmation was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ConfirmMsg, {
                                uid: Userid.uid,
                                Exchange: Retention.Exchange,
                                TradSym: PlaceOrder.Tsym
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.confirmMsg, "confirm Msg has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Order Confirmation failed");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'OrderBookApi': function () {
                    describe('Order Book api test', () => {
                        let res;
                        it('Check Order Book api was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.OrderBook, {
                                uid: Userid.uid,
                                s_prdt_ali: PlaceOrder.s_prdt_ali
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Exseg, "Exseg has come");
                                assert.isOk(result.Trsym, "Trsym has come");
                                assert.isOk(result.Nstordno, "Nstordno has come");
                                assert.isOk(result.Prc, "Price has come");
                                assert.isOk(result.Qty, "Qty has come");
                                assert.isOk(result.Dscqty, "Dscqty has come");
                                assert.isOk(result.Trgprc, "Trigger Price has come");
                                assert.isOk(result.Validity, "Validity of user has come");
                                assert.isOk(result.Scripname, "Scripname has come");
                                assert.isOk(result.Sym, "Sym has come");
                                assert.isOk(result.Status, "Status has come");
                                assert.isOk(result.Fillshares, "Fillshares has come");
                                assert.isOk(result.ExpDate, "ExpDate has come");
                                assert.isOk(result.Ordvaldate, "Ordvaldate has come");
                                assert.isOk(result.Pcode, "Pcode has come");
                                assert.isOk(result.Avgprc, "Avg Price has come");
                                assert.isOk(result.Unfilledsize, "Unfilledsize has come");
                                assert.isOk(result.ExchOrdID, "ExchOrdID has come");
                                assert.isOk(result.RejReason, "Rejection Reason has come");
                                assert.isOk(result.ExchConfrmtime, "ExchConfrmtime has come");
                                assert.isOk(result.Mktpro, "Mktpro has come");
                                assert.isOk(result.Cancelqty, "Cancelqty has come");
                                assert.isOk(result.Trantype, "Trantype has come");
                                assert.isOk(result.Prctype, "Prctype has come");
                                assert.isOk(result.Exchange, "Exchange has come");
                                assert.isOk(result.ticksize, "ticksize has come");
                                assert.isOk(result.decprec, "decprec has come");
                                assert.isOk(result.multiplier, "multiplier has come");
                                assert.isOk(result.bqty, "bqty has come");
                                assert.isOk(result.mpro, "mpro has come");
                                assert.isOk(result.token, "token has come");
                                assert.isOk(result.noMktPro, "noMktPro has come");
                                assert.isOk(result.defmktproval, "defmktproval has come");
                                assert.isOk(result.RequestID, "RequestID has come");
                                assert.isOk(result.SyomOrderId, "SyomOrderId has come");
                                assert.isOk(result.RefLmtPrice, "RefLmtPrice has come");
                                assert.isOk(result.COPercentage, "COPercentage has come");
                                assert.isOk(result.InstName, "InstName has come");
                                assert.isOk(result.ExpSsbDate, "ExpSsbDate has come");
                                assert.isOk(result.discQtyPerc, "discQtyPerc has come");
                                assert.isOk(result.Minqty, "Minqty has come");
                                assert.isOk(result.BrokerClient, "BrokerClient has come");
                                assert.isOk(result.user, "user has come");
                                assert.isOk(result.accountId, "accountId has come");
                                assert.isOk(result.PriceNumerator, "PriceNumerator has come");
                                assert.isOk(result.GeneralNumerator, "GeneralNumerator has come");
                                assert.isOk(result.PriceDenomenator, "PriceDenomenator has come");
                                assert.isOk(result.GeneralDenomenator, "GeneralDenomenator has come");
                                assert.isOk(result.series, "series has come");
                                assert.isOk(result.orderentrytime, "orderentrytime has come");
                                assert.isOk(result.ordergenerationtype, "ordergenerationtype has come");
                                assert.isOk(result.sipindicator, "sipindicator has come");
                                assert.isOk(result.ordersource, "ordersource has come");
                                assert.isOk(result.remarks, "remarks has come");
                                assert.isOk(result.marketprotectionpercentage, "marketprotectionpercentage has come");
                                assert.isOk(result.reporttype, "reporttype has come");
                                assert.isOk(result.iSinceBOE, "iSinceBOE has come");
                                assert.isOk(result.usecs, "usecs has come");
                                assert.isOk(result.modifiedBy, "modifiedBy has come");
                                assert.isOk(result.optionType, "optionType has come");
                                assert.isOk(result.strikePrice, "strikePrice has come");
                                assert.isOk(result.Usercomments, "Usercomments has come");
                                assert.isOk(result.AlgoID, "AlgoID has come");
                                assert.isOk(result.AlgoCategory, "AlgoCategory has come");
                                assert.isOk(result.panNo, "panNo has come");
                                assert.isOk(result.OrderedTime, "OrderedTime has come");
                                assert.isOk(result.customText, "customText has come");
                                assert.isOk(result.orderCriteria, "orderCriteria has come");
                                assert.isOk(result.exchangeuserinfo, "exchangeuserinfo has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Order Book was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'TradeBookApi': function () {
                    describe('Trade Book api test', () => {
                        let res;
                        it('Check get Trade Book was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.TradeBook, {
                                uid: Userid.uid,
                                s_prdt_ali: PlaceOrder.s_prdt_ali
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Exchange, "Exseg has come");
                                assert.isOk(result.Tsym, "Trsym has come");
                                assert.isOk(result.Filledqty, "Filledqty has come");
                                assert.isOk(result.AvgPrice, "AvgPrice has come");
                                assert.isOk(result.Pcode, "Pcode has come");
                                assert.isOk(result.Nstordno, "Nstordno has come");
                                assert.isOk(result.Trantype, "Trantype has come");
                                assert.isOk(result.FillId, "FillId of user has come");
                                assert.isOk(result.Symbol, "Symbol has come");
                                assert.isOk(result.Fillqty, "Fillqty has come");
                                assert.isOk(result.Price, "Price has come");
                                assert.isOk(result.Exchseg, "Exchseg has come");
                                assert.isOk(result.Custofrm, "Custofrm has come");
                                assert.isOk(result.Prctype, "Prctype has come");
                                assert.isOk(result.Ordduration, "Ordduration has come");
                                assert.isOk(result.NOReqID, "NOReqID has come");
                                assert.isOk(result.FillLeg, "FillLeg has come");
                                assert.isOk(result.Filldate, "Filldate has come");
                                assert.isOk(result.Filltime, "Filltime has come");
                                assert.isOk(result.Qty, "Qty has come");
                                assert.isOk(result.ExchordID, "ExchordID has come");
                                assert.isOk(result.Time, "Time has come");
                                assert.isOk(result.Exchtime, "Exchtime has come");
                                assert.isOk(result.posflag, "posflag has come");
                                assert.isOk(result.Minqty, "Minqty has come");
                                assert.isOk(result.BrokerClient, "BrokerClient has come");
                                assert.isOk(result.user, "user has come");
                                assert.isOk(result.accountId, "accountId has come");
                                assert.isOk(result.ReportType, "ReportType has come");
                                assert.isOk(result.PriceNumerator, "PriceNumerator has come");
                                assert.isOk(result.GeneralNumerator, "GeneralNumerator has come");
                                assert.isOk(result.PriceDenomenator, "PriceDenomenator has come");
                                assert.isOk(result.GeneralDenomenator, "GeneralDenomenator has come");
                                assert.isOk(result.bqty, "bqty has come");
                                assert.isOk(result.companyname, "companyname has come");
                                assert.isOk(result.series, "series has come");
                                assert.isOk(result.ordergenerationtype, "ordergenerationtype has come");
                                assert.isOk(result.remarks, "remarks has come");
                                assert.isOk(result.symbolname, "symbolname has come");
                                assert.isOk(result.iSinceBOE, "iSinceBOE has come");
                                assert.isOk(result.usecs, "usecs has come");
                                assert.isOk(result.Expiry, "Expiry has come");
                                assert.isOk(result.expdate, "expdate has come");
                                assert.isOk(result.strikeprice, "strikeprice has come");
                                assert.isOk(result.optiontype, "optiontype has come");
                                assert.isOk(result.AlgoID, "AlgoID has come");
                                assert.isOk(result.AlgoCategory, "AlgoCategory has come");
                                assert.isOk(result.panNo, "panNo has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Trade Book was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'PositionBookApi': function () {
                    describe('Position Book api test', () => {
                        let res;
                        it('Check Position Book api was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.PositionBook, {
                                uid: Userid.uid,
                                actid: Userid.actid,
                                type: PositionBook.type,
                                s_prdt_ali: PlaceOrder.s_prdt_ali
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Exchange, "Exseg has come");
                                assert.isOk(result.Tsym, "Trsym has come");
                                assert.isOk(result.Netqty, "Netqty has come");
                                assert.isOk(result.Netamt, "Netamt has come");
                                assert.isOk(result.Pcode, "Pcode has come");
                                assert.isOk(result.MtoM, "MtoM has come");
                                assert.isOk(result.BEP, "BEP has come");
                                assert.isOk(result.LTP, "LTP of user has come");
                                assert.isOk(result.Instname, "Instname has come");
                                assert.isOk(result.Expdate, "Expdate has come");
                                assert.isOk(result.Opttype, "Opttype has come");
                                assert.isOk(result.Stikeprc, "Stikeprc has come");
                                assert.isOk(result.Buyavgprc, "Buyavgprc has come");
                                assert.isOk(result.Sellavgprc, "Sellavgprc has come");
                                assert.isOk(result.Bqty, "Bqty has come");
                                assert.isOk(result.Sqty, "Sqty has come");
                                assert.isOk(result.Fillbuyamt, "Fillbuyamt has come");
                                assert.isOk(result.Fillsellamt, "Fillsellamt has come");
                                assert.isOk(result.BLQty, "BLQty has come");
                                assert.isOk(result.Token, "Token has come");
                                assert.isOk(result.Symbol, "Symbol has come");
                                assert.isOk(result.Exchangeseg, "Exchangeseg has come");
                                assert.isOk(result.Fillbuyqty, "Fillbuyqty has come");
                                assert.isOk(result.Fillsellqty, "Fillsellqty has come");
                                assert.isOk(result.s_NetQtyPosConv, "s_NetQtyPosConv has come");
                                assert.isOk(result.posflag, "posflag has come");
                                assert.isOk(result.sSqrflg, "sSqrflg has come");
                                assert.isOk(result.discQty, "discQty has come");
                                assert.isOk(result.PriceNumerator, "PriceNumerator has come");
                                assert.isOk(result.GeneralNumerator, "GeneralNumerator has come");
                                assert.isOk(result.PriceDenomenator, "PriceDenomenator has come");
                                assert.isOk(result.GeneralDenomenator, "GeneralDenomenator has come");
                                assert.isOk(result.companyname, "companyname has come");
                                assert.isOk(result.realisedprofitloss, "realisedprofitloss has come");
                                assert.isOk(result.unrealisedprofitloss, "unrealisedprofitloss has come");
                                assert.isOk(result.Type, "Type has come");
                                assert.isOk(result.Series, "Series has come");
                                assert.isOk(result.netSellamt, "netSellamt has come");
                                assert.isOk(result.netbuyamt, "netbuyamt has come");
                                assert.isOk(result.netbuyqty, "netbuyqty has come");
                                assert.isOk(result.netsellqty, "netsellqty has come");
                                assert.isOk(result.CFBuyavgprc, "CFBuyavgprc has come");
                                assert.isOk(result.CFsellavgprc, "CFsellavgprc has come");
                                assert.isOk(result.CFbuyqty, "CFbuyqty has come");
                                assert.isOk(result.CFsellqty, "CFsellqty has come");
                                assert.isOk(result.FillbuyamtCF, "FillbuyamtCF has come");
                                assert.isOk(result.FillsellamtCF, "FillsellamtCF has come");
                                assert.isOk(result.actid, "actid has come");
                                assert.isOk(result.NetBuyavgprc, "NetBuyavgprc has come");
                                assert.isOk(result.NetSellavgprc, "NetSellavgprc has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Position Book was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'LimitsApi': function () {
                    describe('Limits Api test', () => {
                        let res;
                        it('Check Limits api was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.Limits, {
                                uid: Userid.uid,
                                actid: Userid.actid,
                                segment: Limits.segment
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.segment, "segment has come");
                                assert.isOk(result.BookedPNL, "BookedPNL has come");
                                assert.isOk(result.UnbookedPNL, "UnbookedPNL has come");
                                assert.isOk(result.BuyPower, "BuyPower has come");
                                assert.isOk(result.Adhoc, "Adhoc has come");
                                assert.isOk(result.grossCollateral, "grossCollateral has come");
                                assert.isOk(result.t1grossCollateral, "t1grossCollateral has come");
                                assert.isOk(result.StockValuation, "StockValuation has come");
                                assert.isOk(result.OpeningBalance, "OpeningBalance has come");
                                assert.isOk(result.directcollateralvalue, "directcollateralvalue has come");
                                assert.isOk(result.adhocmargin, "adhocmargin has come");
                                assert.isOk(result.branchadhoc, "branchadhoc has come");
                                assert.isOk(result.credits, "credits has come");
                                assert.isOk(result.notionalcash, "notionalcash has come");
                                assert.isOk(result.PayinAmt, "PayinAmt has come");
                                assert.isOk(result.cncMarginVarPrsnt, "cncMarginVarPrsnt has come");
                                assert.isOk(result.cncMarginElmPrsnt, "cncMarginElmPrsnt has come");
                                assert.isOk(result.buyExposurePrsnt, "buyExposurePrsnt has come");
                                assert.isOk(result.sellExposurePrsnt, "sellExposurePrsnt has come");
                                assert.isOk(result.losslimit, "losslimit has come");
                                assert.isOk(result.Utilizedamount, "Utilizedamount has come");
                                assert.isOk(result.IPOAmount, "IPOAmount has come");
                                assert.isOk(result.PayoutAmt, "PayoutAmt has come");
                                assert.isOk(result.category, "category has come");
                                assert.isOk(result.turnover, "turnover has come");
                                assert.isOk(result.multiplier, "multiplier has come");
                                assert.isOk(result.grossexposurevalue, "grossexposurevalue has come");
                                assert.isOk(result.elm, "elm has come");
                                assert.isOk(result.valueindelivery, "valueindelivery has come");
                                assert.isOk(result.varmargin, "varmargin has come");
                                assert.isOk(result.spanmargin, "spanmargin has come");
                                assert.isOk(result.adhocscripmargin, "adhocscripmargin has come");
                                assert.isOk(result.scripbasketmargin, "scripbasketmargin has come");
                                assert.isOk(result.exposuremargin, "exposuremargin has come");
                                assert.isOk(result.premiumpresent, "premiumpresent has come");
                                assert.isOk(result.realisedmtom, "realisedmtom has come");
                                assert.isOk(result.unrealisedmtom, "unrealisedmtom has come");
                                assert.isOk(result.mfamount, "mfamount has come");
                                assert.isOk(result.debits, "debits has come");
                                assert.isOk(result.cncsellcreditpresent, "cncsellcreditpresent has come");
                                assert.isOk(result.cncmarginused, "cncmarginused has come");
                                assert.isOk(result.cncbrokerageprsnt, "cncbrokerageprsnt has come");
                                assert.isOk(result.cncunrealizedmtomprsnt, "cncunrealizedmtomprsnt has come");
                                assert.isOk(result.cncrealizedmtomprsnt, "cncrealizedmtomprsnt has come");
                                assert.isOk(result.mfssamountused, "mfssamountused has come");
                                assert.isOk(result.nfospreadbenefit, "nfospreadbenefit has come");
                                assert.isOk(result.cdsspreadbenefit, "cdsspreadbenefit has come");
                                assert.isOk(result.brokerageprsnt, "brokerageprsnt has come");
                                assert.isOk(result.COMarginRequired, "COMarginRequired has come");
                                assert.isOk(result.BOmarginRequired, "BOmarginRequired has come");
                                assert.isOk(result.marginScripBasketCustomPresent, "marginScripBasketCustomPresent has come");
                                assert.isOk(result.specialmarginprsnt, "specialmarginprsnt has come");
                                assert.isOk(result.tendermarginprsnt, "tendermarginprsnt has come");
                                assert.isOk(result.additionalpreexpirymarginprsnt, "additionalpreexpirymarginprsnt has come");
                                assert.isOk(result.additionalmarginprsnt, "additionalmarginprsnt has come");
                                assert.isOk(result.deliverymarginprsnt, "deliverymarginprsnt has come");
                                assert.isOk(result.financelimit, "financelimit has come");
                                assert.isOk(result.lien, "lien has come");
                                assert.isOk(result.viewrealizedmtom, "viewrealizedmtom has come");
                                assert.isOk(result.viewunrealizedmtom, "viewunrealizedmtom has come");
                                assert.isOk(result.elbamount, "elbamount has come");
                                assert.isOk(result.Netcashavailable, "Netcashavailable has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Limits was not retrieved");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'ShowQuote': function () {
                    describe('ShowQuote Api test', () => {
                        let res;
                        it('Check if ShowQuote api was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.ShowQuote, {
                                Exchange: "NCO",
                                Symbol: "1004"
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Ltp, "Ltp msg has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("ShowQuote failed");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                },
                'LogoutApi': function () {
                    describe('Logout Api test', () => {
                        let res;
                        it('Check if Logout api was a success:', (done) => {
                            apiCall_1.restApiCall(apiDefinitions_1.RestApiUri.Logout, {
                                uid: Userid.uid
                            }, apiKey).then(result => {
                                assert.isOk(result.stat, "stat has come");
                                assert.isOk(result.Check, "Logout msg has come");
                                res = result;
                                done();
                            }).catch(err => {
                                assert.fail("Logout failed");
                                done();
                            });
                        });
                        it('Check for errors(negative check)', (done) => {
                            expect(res.stat).to.not.include("Not_Ok");
                            expect(res.Emsg).to.be.undefined;
                            done();
                            apiKey = apiKey;
                        });
                    });
                }
            };
            lookupTable['GetInitialKey']();
            lookupTable['GetPreAuthenticationKey']();
            lookupTable['Login2FA']();
            lookupTable['ValidPwd']();
            lookupTable['ValidAns']();
            lookupTable['DefaultLogin']();
            lookupTable['ShowQuote']();
            lookupTable['LogoutApi']();
            done();
        });
    });
});
//# sourceMappingURL=test.js.map