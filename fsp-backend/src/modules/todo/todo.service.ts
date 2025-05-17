import { TGetTodosQueryParams, TTodo, TTodoSorting } from "@/shared/types"
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
  const todos = await todoModel.getTodosByLimitAndOffset(personId, params)
  const count = await todoModel.getTodosCount(personId, params?.filter ?? "")

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
