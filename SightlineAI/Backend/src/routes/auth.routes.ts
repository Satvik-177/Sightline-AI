import express from "express"
import { validateRequest } from "../middleware/validateRequest.js"
import { loginSchema, signUpSchema } from "../validators/auth.validator.js"
import { login, signUp, getMe, logout } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"
import { authLimiter } from "../middleware/rateLimit.middleware.js"

const authRoute = express.Router()

authRoute.post("/signup",authLimiter,validateRequest(signUpSchema),signUp)
authRoute.post("/login",authLimiter,validateRequest(loginSchema),login)
authRoute.get("/getMe",protect,getMe)
authRoute.post("/logout",protect,logout)

export default authRoute