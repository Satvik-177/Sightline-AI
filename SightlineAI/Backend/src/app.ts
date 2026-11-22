import express from "express"
import helmet from "helmet"
import cors from "cors"

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({limit:"10mb"}))

app.get("/api/health",(req,res)=>{

    res.status(200).json({
        success:true,
        message:"SightLine AI backend is running"
    })
})

export default app