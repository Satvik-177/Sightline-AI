import bcrypt from "bcryptjs"

export async function hashedPassword(password:string):Promise<string>{

    return bcrypt.hash(password,12)
}

export async function comparePassword(

    password:string,
    hashedPassword:string
): Promise<boolean>{

    return bcrypt.compare(password,hashedPassword)
}