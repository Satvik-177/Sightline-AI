import type { Request, Response } from "express";

export function adminDashboard(
    req:Request,
    res:Response
):void{

    res.status(200).json({

        success:true,
        message:"Welcome to the admin dashboard"
    })
}