import type { Request, Response, NextFunction } from "express";
import { getCurrentUser, loginUser, registerUser, revokeToken } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";

export async function signUp(
    req:Request,
    res:Response,
    next:NextFunction
):Promise<void>{

    try{

        const {name, email, password} = req.body

        const user = await registerUser(name,email,password);

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user,
        });
    }

    catch(error){
        next(error)
    }
}

export async function login(

    req:Request,
    res:Response,
    next:NextFunction
):Promise<void>{

    try{

        const {email, password} = req.body

        const user = await loginUser(email,password)

        res.status(200).json({
            success:true,
            message:"Login succesfull",
            data:user,
        });
    }

    catch(error){
        next(error)
    }
}

export async function getMe(

    req:Request,
    res:Response
):Promise<void>{

    if(!req.user){
        throw new AppError("User not found", 401)
    }

    const user = await getCurrentUser(req.user.id)

    res.status(200).json({

        success:true,
        message:"User profile fetched successfully",
        data:user
    })
}

export async function logout(
    req:Request,
    res:Response
):Promise<void>{

    if(!req.user){
        throw new AppError("Authentication required",401)
    }

    await revokeToken(
        req.user.tokenId,
        req.user.expiresAt
    )

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}