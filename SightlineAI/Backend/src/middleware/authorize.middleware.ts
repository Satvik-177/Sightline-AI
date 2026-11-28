import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export function restrictTo(...roles: string[]){

    return (req:Request,res:Response,next:NextFunction):void=>{

        if(!req.user){
            return next(new AppError("Authentication required", 401))
        }

        if(!roles.includes(req.user.role)){
            return next(new AppError("You do not have permission to perform this action",403))
        }

        next()
    }
}