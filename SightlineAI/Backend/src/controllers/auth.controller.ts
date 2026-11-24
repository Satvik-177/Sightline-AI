import type { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

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