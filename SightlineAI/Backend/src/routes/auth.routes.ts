import express from "express"
import { validateRequest } from "../middleware/validateRequest.js"
import { loginSchema, signUpSchema } from "../validators/auth.validator.js"
import { login, signUp } from "../controllers/auth.controller.js"

const authRoute = express.Router()

authRoute.post("/signup", validateRequest(signUpSchema),signUp)
authRoute.post("/login", validateRequest(loginSchema),login)

export default authRoute