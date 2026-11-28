import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export function errorHandler(

    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
): void{

    let statusCode = 500
    let message = "Internal Server error"
    
    if(err instanceof AppError){
        statusCode = err.statusCode;
        message = err.message
    }

    logger.error(
        {
            err,
            method:req.method,
            url:req.originalUrl
        },

        message
    );

    res.status(statusCode).json({
        success:false,
        status: statusCode === 500 ? "error" : "fail",
        message
    });
}