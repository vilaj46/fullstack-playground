import express from "express"

import controller from "@/modules/todo/todo.controller"

const router = express.Router()

router.get("/todos", controller.getAllTodos)
router.post("/todos", controller.createTodo)
router.delete("/todos/:id", controller.deleteTodo)
router.patch("/todos/:id", controller.toggleTodo)

export default router
