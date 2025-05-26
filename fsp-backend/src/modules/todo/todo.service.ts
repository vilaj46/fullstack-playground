import { TTodo } from "@/shared/types"

import { TGetTodosQuery } from "@/modules/todo/todo.types"

import todoModel from "@/modules/todo/todo.model"

const getAllTodos = (personId: number) => todoModel.getAllTodos(personId)

const getTodosByLimitAndOffset = async (
  personId: number,
  params: TGetTodosQuery
) => {
  const { filter, limit, offset, sorting } = params

  const [todos, count] = await Promise.all([
    todoModel.getTodosByLimitAndOffset(personId, {
      filter,
      limit,
      offset,
      sorting,
    }),
    todoModel.getTodosCount(personId, filter),
  ])

  const totalPages = Math.ceil(count / limit)

  return {
    data: todos,
    pagination: {
      totalItems: count,
      totalPages,
      limit,
      offset,
    },
  }
}

const createTodo = (personId: number, task: TTodo["task"]) =>
  todoModel.createTodo(personId, task)

const deleteTodo = (id: TTodo["id"]) => todoModel.deleteTodo(id)

const toggleTodo = (id: TTodo["id"]) => todoModel.toggleTodo(id)

export default {
  getAllTodos,
  getTodosByLimitAndOffset,
  createTodo,
  deleteTodo,
  toggleTodo,
}
