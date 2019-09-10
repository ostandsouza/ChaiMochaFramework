//import mongoose = require('mongoose');
import * as mongoose from "mongoose";
export var connection : mongoose.Connection ;
export const MongoConn = (_done) :mongoose.Connection=>{
    connection = mongoose.connect('mongodb://localhost:27017/RestApi',{ useNewUrlParser: true }, (error => {
        if (!error){
            console.log("conntection made successfull to",mongoose.connection.db.databaseName);
            // mongoose.connection.collection('ExecuteApi').findOne({"execute" : true}, function(_err, data){
            //     if(_err)
            //     console.log(">>>> ", _err );
            //     else
            //     console.log(">>>> ", data);
            _done();
            // });
        }
        else
            console.log("conntection error:",error);
        }));
    return connection;
}
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