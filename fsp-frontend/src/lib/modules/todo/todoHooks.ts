import type {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query"
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import type { TGetTodosQueryParams, TTodo, TTodoSorting } from "@/shared/types"

import { ApiError } from "@/shared/classes"

import todoService from "@/lib/modules/todo/todoService"

const queryKeys = {
  all: ["todos"],
  infinite: ["infinite", "todos"],
  offset: (params: { limit: number; offset: number; filter: string }) => [
    ...queryKeys.all,
    params.limit,
    params.offset,
    // params.filter,
  ],
}

const useGetAllTodos = (options?: Partial<UseQueryOptions<Array<TTodo>>>) =>
  useQuery({
    ...options,
    queryFn: todoService.getTodos,
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
      todoService.getInfiniteTodos({
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
  params: TGetTodosQueryParams,
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
    queryFn: () => todoService.getOffsetTodos(params),
  })

const usePostTodo = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.createTodo,
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
    mutationFn: (id: TTodo["id"]) => todoService.deleteTodo(id),
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
    mutationFn: (id: TTodo["id"]) => todoService.toggleTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.all,
      })
    },
  })
}

const useTodos = (config: {
  currentPage: number
  filter: string
  onPostSuccess: () => void
  sort: TTodoSorting
}) => {
  const LIMIT: number = 100
  const IS_INFINITE_QUERY: boolean = false

  const todosQueryResult = useGetOffsetTodos(
    {
      limit: LIMIT,
      offset: LIMIT * (config.currentPage - 1),
      filter: config.filter,
      sorting: config.sort,
    },
    {
      enabled: !IS_INFINITE_QUERY,
    }
  )

  const todosInfiniteQueryResult = useGetInfiniteTodos(LIMIT, {
    enabled: IS_INFINITE_QUERY,
  })
  const postTodoMutation = usePostTodo({
    onSuccess: config.onPostSuccess,
  })
  const deleteTodoMutation = useDeleteTodo()
  const toggleTodoMutation = useToggleTodo()

  const isTodosQueryPending = !IS_INFINITE_QUERY && todosQueryResult.isPending
  const isTodosInfinitePending =
    IS_INFINITE_QUERY && todosInfiniteQueryResult.isPending

  const getTodos = (): Array<TTodo> => {
    if (IS_INFINITE_QUERY) {
      const pages = todosInfiniteQueryResult.data?.pages
      return (
        pages?.reduce((currentPage, accumulator) => {
          return [...accumulator, ...currentPage]
        }, []) ?? []
      )
    }

    return todosQueryResult.data?.data ?? []
  }

  return {
    errorMessage: `An error has occurered: ${
      IS_INFINITE_QUERY
        ? todosInfiniteQueryResult.error?.message
        : todosQueryResult.error?.message
    }`,
    getTodos,
    handleCreateTodo: postTodoMutation.mutate,
    handleDeleteTodo: deleteTodoMutation.mutate,
    handleToggleTodo: toggleTodoMutation.mutate,
    isError: todosQueryResult.isError || todosInfiniteQueryResult.isError,
    isInfiniteQuery: IS_INFINITE_QUERY,
    isLoading: isTodosInfinitePending || isTodosQueryPending,
    todosInfiniteQueryResult,
    todosQueryResult,
  }
}

export {
  useGetAllTodos,
  useGetInfiniteTodos,
  useGetOffsetTodos,
  usePostTodo,
  useDeleteTodo,
  useTodos,
  useToggleTodo,
}
