import express from "express"

import authRoutes from "@/modules/auth/auth.routes"
import todoRoutes from "@/modules/todo/todo.routes"

const router = express.Router()

router.use(authRoutes)
router.use(todoRoutes)

export default router
