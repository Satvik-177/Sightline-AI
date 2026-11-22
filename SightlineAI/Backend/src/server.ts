import "dotenv/config"
import app from "./app.js"

const PORT = Number(process.env.port) || 5000

app.listen(PORT,()=>{

    console.log(`SlightLine AI server is running on port ${PORT}`)
})
