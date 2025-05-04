import { useQuery } from "@tanstack/react-query"

import type { TApiResponse, TTodo } from "@/shared/types"

import { getAllTodos } from "@/lib/modules/todo/todoServices"

const useGetAllTodos = () =>
  useQuery<TApiResponse<Array<TTodo>>>({
    queryFn: getAllTodos,
    queryKey: ["todos"],
  })

export { useGetAllTodos }
