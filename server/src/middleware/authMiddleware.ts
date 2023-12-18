import userMessage from "../models/userMessage";
require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "console";

export interface TokenData{
    id:string;
    name:string;
    email:string;
    
}
const userVerification= (req:Request, res:Response, next:NextFunction)=>{
   
    const token = req.cookies.access_token;
    
    if(!token){
       return res.send({status:false,message:"you are not loggged in"});
    }
    jwt.verify(token, process.env.TOKEN_KEY,async (error:jwt.VerifyErrors, user: JwtPayload)=>{
        if (error) return  res.send({status:false,message:"you are not authenticated"});
        
        req.body.userId = user.id;
        next();
    })
}
export default userVerification;