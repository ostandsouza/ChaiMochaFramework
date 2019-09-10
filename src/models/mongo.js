"use strict";
exports.__esModule = true;
//import mongoose = require('mongoose');
var mongoose = require("mongoose");
exports.MongoConn = function (_done) {
    exports.connection = mongoose.connect('mongodb://localhost:27017/RestApi', { useNewUrlParser: true }, (function (error) {
        if (!error) {
            console.log("conntection made successfull to", mongoose.connection.db.databaseName);
            // mongoose.connection.collection('ExecuteApi').findOne({"execute" : true}, function(_err, data){
            //     if(_err)
            //     console.log(">>>> ", _err );
            //     else
            //     console.log(">>>> ", data);
            _done();
            // });
        }
        else
            console.log("conntection error:", error);
    }));
    return exports.connection;
};
//     mongod.Connection.openUri('open',function(){
//     console.log("conntection made successfull")
//     }).on('error',function(error){
//     console.log("conntection error:",error);
//     });
// }
// export const MongoConn = async()=>{
//         await connect('mongodb://localhost/Restapi',{ useNewUrlParser: true });
//         connection.once('open',function(){
//         console.log("conntection made successfull")
//         }).on('error',function(error){
//         console.log("conntection error:",error);
//         });
//     };
