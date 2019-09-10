import * as mongoose from "mongoose";
import * as mSchema from './models/schema';
import { MongoApi, LoginApi, PwdApi, AnsApi, MWApi, RetentionApi, PlaceOrderApi, PositionBookApi, LimitsApi } from "../src/interfaces";

export const getExecuteApi = async (): Promise<MongoApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.ExecuteApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
    return new Promise<MongoApi>(async(resolve, reject) => {
        await mSchema.ExecuteApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getLogin2FAApi = async (): Promise<LoginApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.Login2FAApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<LoginApi>(async(resolve, reject) => {
        await mSchema.Login2FAApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getPwdAuthApi = async (): Promise<PwdApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.PwdAuthApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<PwdApi>(async(resolve, reject) => {
        await mSchema.PwdAuthApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getAnsValidationApi = async (): Promise<AnsApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.AnsValidationApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<AnsApi>(async(resolve, reject) => {
        await mSchema.AnsValidationApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getMWApi = async (): Promise<MWApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.MWApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<MWApi>(async(resolve, reject) => {
        await mSchema.MWApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getLoadRetentionTypeApi = async (): Promise<RetentionApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.LoadRetentionApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<RetentionApi>(async(resolve, reject) => {
        await mSchema.LoadRetentionApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getPlaceOrderApi = async (): Promise<PlaceOrderApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.PlaceOrderApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<PlaceOrderApi>(async(resolve, reject) => {
        await mSchema.PlaceOrderApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getPositionBookApi = async (): Promise<PositionBookApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.PositionBookApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<PositionBookApi>(async(resolve, reject) => {
        await mSchema.PositionBookApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   

export const getLimitsApi = async (): Promise<LimitsApi>=>{
    let Count: number;
    var response:any = "";
    await mSchema.LimitsApi.estimatedDocumentCount().then(function(result){
        Count = result;
    }).catch(err => {
        console.log("Count not Successful");
      });
      return new Promise<LimitsApi>(async(resolve, reject) => {
        await mSchema.LimitsApi.find().then(function(doc){
            response = doc.pop();
            resolve(response);
            //console.log("response",response);
        }).catch(err1 => {
            console.log("tcount not Successful",err1);
            reject(new Error("Request not Successful"));
        });
    });
}   