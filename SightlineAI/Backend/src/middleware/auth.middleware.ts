import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import { RevokedToken } from "../Models/RevokedToken.js";


type AuthTokenPayload = {
  sub: string;
  jti: string;
  exp: number;
};

export async function protect(

    req:Request,
    res:Response,
    next:NextFunction
): Promise<void>{


    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
       return next(new AppError("Authentication required", 401))
    }

    const token = authHeader.split(" ")[1]

    if(!token){
        return next(new AppError("Invalid token", 401))
    }

    let decoded: AuthTokenPayload

    try{

        const payload = jwt.verify(token,env.JWT_SECRET);

        if(typeof payload === "string"){
            return next(new AppError("JWT Payload is a string", 401))
        }

        if(
            typeof payload["sub"] !== "string" ||
            typeof payload["jti"] !== "string" ||
            typeof payload["exp"] !== "number"
        ){

            console.log(typeof payload["sub"])
            console.log(typeof payload["jti"])
            console.log(typeof payload["exp"])
            
            return next(new AppError("JWT claims are invalid",401))
        }

        decoded = payload as AuthTokenPayload
    }

    catch(err){

        return next(new AppError("Invalid or expired token", 401))
    }

    const revokedToken = await RevokedToken.findOne({
        jti:decoded.jti
    });

    if(revokedToken){
        return next(new AppError("Token has been revoked", 401))
    }

    req.user = {

        id:decoded.sub!,
        tokenId:decoded.jti,
        expiresAt:new Date(decoded.exp! * 1000)
    };

    next()
}