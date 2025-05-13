import express from "express"

import { authMiddleware } from "@/middleware"

import controller from "@/modules/auth/auth.controller"

const router = express.Router()

router.post("/login", controller.postLogin)
router.post("/logout", controller.postLogout)
router.get("/person", authMiddleware, controller.getPerson)
router.post("/signup", controller.postSignup)

export default router
