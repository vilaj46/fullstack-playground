import type { TTodo } from "@/shared/types"

import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "@/lib/utils/http-utils"

const getAllTodos = async () => await getRequest<Array<TTodo>>("/todos")

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

export { getAllTodos, createTodo, deleteTodo, toggleTodo }
