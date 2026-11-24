import mongoose from "mongoose"
import { env } from "./env.js"
import { logger } from "../utils/logger.js"

export async function connectDB(): Promise<void>{

    if(!env.MONGODB_URI){
        throw new Error("MongoDB URI is missing")
    }

    await mongoose.connect(env.MONGODB_URI)

    logger.info("MongoDB connected successfully")
}