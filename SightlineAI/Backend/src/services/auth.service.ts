import { User } from "../Models/User.js";
import { AppError } from "../utils/AppError.js";
import { comparePassword, hashedPassword } from "../utils/password.js";

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

    return{

        user:user._id,
        name:user.name,
        email:user.email
    }
}