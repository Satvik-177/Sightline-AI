import { RevokedToken } from "../Models/RevokedToken.js";
import { User } from "../Models/User.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashedPassword } from 
"../utils/password.js";

export async function registerUser(
    name:string,
    email:string,
    password:string
){

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new AppError("User already registered",409)
    }

    const passwordHash = await hashedPassword(password)

    const user = await User.create({
        name,
        email,
        passwordHash,
    })

    return {

        id:user._id,
        name:user.name,
        email:user.email,
    }
}

export async function loginUser(
    email:string,
    password:string
){

    const user = await User.findOne({email:email.toLowerCase()}).select("+passwordHash")

    if(!user){

        throw new AppError("Invalid email or password", 401)
    }

    const isPasswordValid = await comparePassword(password,user.passwordHash)


    if(!isPasswordValid){

        throw new AppError("Invalid email or password",401)
    }

    const token = generateToken(user._id.toString())

    return{

        user:user._id,
        name:user.name,
        email:user.email,
        token
    }
}

export async function getCurrentUser(userId: string){

    const user = await User.findById(userId)

    if(!user){
        throw new AppError('user not found', 404)
    }

    return {

        id:user._id.toString(),
        name:user.name,
        email:user.email
    };
}

export async function revokeToken(
    tokenId:string,
    expiresAt:Date
):Promise<void>{

    await RevokedToken.create({
        jti:tokenId,
        expiresAt
    })
}