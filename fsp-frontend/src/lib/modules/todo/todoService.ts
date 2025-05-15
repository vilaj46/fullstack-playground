import type { TTodo } from "@/shared/types"

import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "@/lib/utils/http-utils"

const getTodos = async () => await getRequest<Array<TTodo>>("/todos")

const getInfiniteTodos = async (params: { limit: number; offset: number }) =>
  await getRequest<Array<TTodo>>(
    `/todos?limit=${params.limit}&offset=${params.offset}`
  )

const getOffsetTodos = async (params: { limit: number; offset: number }) =>
  await getRequest<{
    data: Array<TTodo>
    pagination: {
      totalPages: number
    }
  }>(`/todos?paginated=true&limit=${params.limit}&offset=${params.offset}`)

const createTodo = async (task: TTodo["task"]) =>
  await postRequest<
    TTodo,
    {
      task: TTodo["task"]
    }
  >("/todos", { task })

const deleteTodo = async (id: TTodo["id"]) =>
  await deleteRequest(`/todos/${id}`)

const toggleTodo = async (id: TTodo["id"]) =>
  await patchRequest<TTodo>(`/todos/${id}`)

export default {
  getTodos,
  getInfiniteTodos,
  getOffsetTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
}
