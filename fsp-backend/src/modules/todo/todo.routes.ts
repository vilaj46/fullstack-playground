import express from "express"

import { authMiddleware } from "@/middleware"

import controller from "@/modules/todo/todo.controller"

const router = express.Router()

router.get("/todos", controller.getTodos)
router.post("/todos", authMiddleware, controller.createTodo)
router.delete("/todos/:id", authMiddleware, controller.deleteTodo)
router.patch("/todos/:id", authMiddleware, controller.toggleTodo)

export default router
