import { NextFunction } from "express"

import { TTodo } from "@/shared/types"

import { TGetTodosQuery } from "@/modules/todo/todo.types"
import { TRequest, TResponse } from "@/types"

import { getPersonIdFromToken } from "@/modules/auth/auth.utils"
import todoService from "@/modules/todo/todo.service"

const getTodos = async (
  request: TRequest,
  response: TResponse<{
    locals: {
      validatedQuery: TGetTodosQuery
    }
  }>,
  next: NextFunction
) => {
  try {
    const personId = getPersonIdFromToken(request.cookies?.token)

    if (!response.locals.validatedQuery) {
      const todos = await todoService.getAllTodos(personId)
      response.status(200).json({
        data: todos,
      })
      return
    }

    // const { filter, limit, offset } = request.validatedQuery

    const todos = await todoService.getTodosByLimitAndOffset(
      personId,
      response.locals.validatedQuery
    )

    response.status(200).json({
      data: todos.data,
      pagination: todos.pagination,
    })
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

export default { getTodos, createTodo, deleteTodo, toggleTodo }
