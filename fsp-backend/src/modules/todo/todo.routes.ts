import express from "express"

import { GetTodosSchema } from "@/modules/todo/todo.schemas"

import { authMiddleware } from "@/middleware"
import requestMiddleware from "@/middleware/requestMiddleware"

import controller from "@/modules/todo/todo.controller"

const router = express.Router()

router.get(
  "/todos",
  requestMiddleware(GetTodosSchema, "query"),
  controller.getTodos
)
router.post("/todos", authMiddleware, controller.createTodo)
router.delete("/todos/:id", authMiddleware, controller.deleteTodo)
router.patch("/todos/:id", authMiddleware, controller.toggleTodo)

export default router
