import { NextFunction } from "express"

import { TTodo } from "@/shared/types"

import { TRequest, TResponse } from "@/types"

import { getPersonIdFromToken } from "@/modules/auth/auth.utils"
import todoService from "@/modules/todo/todo.service"
import { getLimitAndOffset } from "@/utils/request-utils"

const getAllTodos = async (
  request: TRequest<{
    reqQuery?: {
      limit?: string
      offset?: string
      paginated?: string
    }
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const query = getLimitAndOffset(request.query)

    const personId = getPersonIdFromToken(request.cookies?.token)
    if (!query) {
      const todos = await todoService.getAllTodos(personId)
      response.status(200).json(todos)
    } else {
      const todos = await todoService.getTodosByLimitAndOffset(personId, query)

      console.log("heyyy")

      if (request.query && "paginated" in request?.query) {
        response.status(200).json(todos)
      } else {
        response.status(200).json(todos.data)
      }
    }
  } catch (error) {
    next(error)
  }
}

const createTodo = async (
  request: TRequest<{
    reqBody: {
      task: TTodo["task"]
    }
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const personId = getPersonIdFromToken(request.cookies?.token)
    const { task } = request.body
    const todo = await todoService.createTodo(personId, task)
    response.status(200).json({ result: todo })
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (
  request: TRequest<{
    params: {
      id?: string
    }
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id ?? "")

    if (!id) {
      throw new Error("No params...")
    }

    await todoService.deleteTodo(id)
    response.status(204).json()
  } catch (error) {
    next(error)
  }
}

const toggleTodo = async (
  request: TRequest<{
    params: { id?: string }
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id ?? "")

    if (!id) {
      throw new Error("No params...")
    }

    await todoService.toggleTodo(id)
    response.status(200).json()
  } catch (error) {
    next(error)
  }
}

export default { getAllTodos, createTodo, deleteTodo, toggleTodo }
