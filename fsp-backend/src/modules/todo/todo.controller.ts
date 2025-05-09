import { NextFunction, Request, Response } from "express"

import { TTodo } from "@/shared/types"

import { TRequest, TResponse } from "@/types"

import todoService from "@/modules/todo/todo.service"

const getAllTodos = async (
  _request: TRequest,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const todos = await todoService.getAllTodos()
    response.status(200).json(todos)
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
    const { task } = request.body
    const todo = await todoService.createTodo(task)
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
