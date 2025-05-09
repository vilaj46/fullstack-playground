import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query"

import type { TTodo } from "@/shared/types"

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  toggleTodo,
} from "@/lib/modules/todo/todoService"

const queryKeys = {
  all: ["todos"],
}

const useGetAllTodos = () =>
  useQuery({
    queryFn: getAllTodos,
    queryKey: queryKeys.all,
  })

const usePostTodo = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (data, _variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, undefined, context)
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.all,
      })
    },
  })
}

const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: TTodo["id"]) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.all,
      })
    },
  })
}

const useToggleTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: TTodo["id"]) => toggleTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.all,
      })
    },
  })
}

export { useGetAllTodos, usePostTodo, useDeleteTodo, useToggleTodo }
