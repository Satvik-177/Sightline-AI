import bcrypt from "bcryptjs"

export async function hashedPassword(password:string):Promise<string>{

    return bcrypt.hash(password,12)
}

export async function comparePassword(

    hashedPassword:string,
    password:string
): Promise<boolean>{

    return bcrypt.compare(password,hashedPassword)
}