import app from "./app.js"
import { env } from "./config/env.js"
import { connectDB } from "./config/database.js"
import { logger } from "./utils/logger.js";

async function startServer():Promise<void>{

    try{
        await connectDB();

        app.listen(env.PORT,()=>{
        
            console.log(`SlightLine AI server is running on port ${env.PORT}`)
       })

    }

    catch(err){

        console.error("Failed to start server:",err)
        process.exit(1)
    }
}

startServer()