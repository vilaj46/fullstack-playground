import type { TLimitAndOffset } from "./http"

import { todoSorting } from "../constants"

type TGetTodosApiOffsetResponse = {
  data: Array<TTodo>
  pagination: {
    totalPages: number
  }
}

type TGetTodosQueryParams = TLimitAndOffset & {
  filter: string
  sorting: TTodoSorting
}

type TTodo = {
  completed: boolean
  id: number
  task: string
}

type TTodoSorting = (typeof todoSorting)[keyof typeof todoSorting]

export type {
  TGetTodosApiOffsetResponse,
  TGetTodosQueryParams,
  TTodo,
  TTodoSorting,
}
