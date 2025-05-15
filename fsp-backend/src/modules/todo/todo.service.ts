import { TTodo } from "@/shared/types"
import todoModel from "@/modules/todo/todo.model"

const getAllTodos = (personId: number) => todoModel.getAllTodos(personId)

const getTodosByLimitAndOffset = async (
  personId: number,
  query: {
    limit: number
    offset: number
  }
) => {
  const todos = await todoModel.getTodosByLimitAndOffset(personId, query)
  const count = await todoModel.getTodosCount(personId)

  return {
    data: todos,
    pagination: {
      totalPages: Math.ceil(count / query.limit),
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
