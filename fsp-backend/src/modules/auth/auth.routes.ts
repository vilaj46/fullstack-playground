import express from "express"

import controller from "@/modules/auth/auth.controller"

const router = express.Router()

router.post("/login", controller.login)

export default router
