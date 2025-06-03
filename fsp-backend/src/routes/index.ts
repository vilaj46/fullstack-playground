import express from "express"

import authRoutes from "@/modules/auth/auth.routes"
import postRoutes from "@/modules/post/post.routes"
import todoRoutes from "@/modules/todo/todo.routes"

const router = express.Router()

router.use(authRoutes)
router.use(postRoutes)
router.use(todoRoutes)

export default router
