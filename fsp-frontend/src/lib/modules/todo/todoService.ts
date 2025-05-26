import type {
  TGetTodosApiOffsetResponse,
  TGetTodosQueryParams,
  TTodo,
} from "@/shared/types"

import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "@/lib/utils/http-utils"
import { generateQueryParams } from "@/shared/utils"

const getTodos = async () => await getRequest<Array<TTodo>>("/todos")

const getInfiniteTodos = async (params: { limit: number; offset: number }) =>
  await getRequest<Array<TTodo>>(
    `/todos?limit=${params.limit}&offset=${params.offset}`
  )

const getOffsetTodos = async (params: TGetTodosQueryParams) => {
  const query = generateQueryParams({
    ...params,
    paginated: true,
  })
  return await getRequest<TGetTodosApiOffsetResponse>(`/todos?${query}  `)
}

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

const service = {
  getTodos,
  getInfiniteTodos,
  getOffsetTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
}

export default service
