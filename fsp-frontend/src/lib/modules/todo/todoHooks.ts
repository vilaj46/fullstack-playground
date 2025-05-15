import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
  type UndefinedInitialDataInfiniteOptions,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query"

import type { TTodo } from "@/shared/types"

import {
  createTodo,
  deleteTodo,
  getInfiniteTodos,
  getOffsetTodos,
  getTodos,
  toggleTodo,
} from "@/lib/modules/todo/todoService"
import type ApiError from "@/shared/classes/ApiError"

const queryKeys = {
  all: ["todos"],
  infinite: ["infinite", "todos"],
  offset: (params: { limit: number; offset: number }) => [
    ...queryKeys.all,
    params.limit,
    params.offset,
  ],
}

const useGetAllTodos = (options?: Partial<UseQueryOptions<Array<TTodo>>>) =>
  useQuery({
    ...options,
    queryFn: getTodos,
    queryKey: queryKeys.all,
  })

const useGetInfiniteTodos = (
  limit: number,
  options?: Partial<
    UndefinedInitialDataInfiniteOptions<
      TTodo[],
      Error,
      InfiniteData<TTodo[], unknown>,
      string[],
      number
    >
  >
) =>
  useInfiniteQuery({
    ...options,
    queryKey: queryKeys.infinite,
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteTodos({
        limit,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const lastPageLength = lastPage?.length ?? 0
      const pagesLength = pages?.length ?? 0

      return lastPageLength === limit ? pagesLength * limit : undefined
    },
  })

const useGetOffsetTodos = (
  params: { limit: number; offset: number },
  options?: Partial<
    UseQueryOptions<
      {
        data: Array<TTodo>
        pagination: {
          totalPages: number
        }
      },
      ApiError
    >
  >
) =>
  useQuery({
    ...options,
    queryKey: queryKeys.offset(params),
    queryFn: () => getOffsetTodos(params),
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

export {
  useGetAllTodos,
  useGetInfiniteTodos,
  useGetOffsetTodos,
  usePostTodo,
  useDeleteTodo,
  useToggleTodo,
}
