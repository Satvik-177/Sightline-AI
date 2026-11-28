import express from "express"
import { protect } from "../middleware/auth.middleware.js"
import { restrictTo } from "../middleware/authorize.middleware.js"
import { adminDashboard } from "../controllers/admin.controller.js"

const router = express.Router()

router.get("/dashboard",protect,restrictTo("admin"),adminDashboard)

export default router