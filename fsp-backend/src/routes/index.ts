import express from "express"

import todoRoutes from "@/modules/todo/todo.routes"

const router = express.Router()

router.use(todoRoutes)

export default router
