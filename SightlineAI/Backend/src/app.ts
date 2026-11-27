import express from "express"
import helmet from "helmet"
import cors from "cors"
import { logger } from "./utils/logger.js"
import { pinoHttp } from "pino-http";
import { errorHandler } from "./middleware/errorHandler.js";
import { AppError } from "./utils/AppError.js";
import authRoute from "./routes/auth.routes.js";

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({limit:"10mb"}))
app.use(pinoHttp({ logger }));

app.get("/api/health",(req,res)=>{

    res.status(200).json({
        success:true,
        message:"SightLine AI backend is running"
    })
})

app.get("/api/test-error",(req,res,next)=>{
    next(new AppError("This is a test error",404))
})

app.use("/api/auth", authRoute)

app.use(errorHandler)

export default app