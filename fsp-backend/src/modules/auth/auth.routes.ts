import express from "express"

import controller from "@/modules/auth/auth.controller"
import { authMiddleware } from "@/middleware"

const router = express.Router()

router.post("/login", controller.login)
router.post("/logout", controller.postLogout)
router.get("/me", authMiddleware, controller.getMe)

export default router
