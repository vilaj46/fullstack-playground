import { TTodo } from "@/shared/types"
import todoModel from "@/modules/todo/todo.model"

const getAllTodos = (personId: number) => todoModel.getAllTodos(personId)

const getTodosByLimitAndOffset = async (
  personId: number,
  params?: {
    filter?: string
    limit?: string
    offset?: string
    paginated?: string
    sorting?: string
  }
) => {
  const filter = params?.filter ? params.filter : ""
  const limit = params?.limit ? parseInt(params.limit) : 100
  const offset = params?.offset ? parseInt(params.offset) : 0

  const todos = await todoModel.getTodosByLimitAndOffset(personId, {
    filter,
    limit,
    offset,
  })
  const count = await todoModel.getTodosCount(personId, filter)

  return {
    data: todos,
    pagination: {
      totalPages: Math.ceil(count / parseInt(params?.limit ?? "0")),
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
