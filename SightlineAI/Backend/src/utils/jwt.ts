import jwt from "jsonwebtoken"
import { env } from "../config/env.js"
import { randomUUID } from "node:crypto"

export function generateToken(userId:string):string{

    const tokenId = randomUUID()

    return jwt.sign(
        {
            sub:userId,
            jti:tokenId
        },
        env.JWT_SECRET,
        {expiresIn:"1d"}
    )
}