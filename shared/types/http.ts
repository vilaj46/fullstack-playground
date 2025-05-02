type TApiBaseResponse = {
  code: number
  message?: string
  status?: string
}

type TApiErrorResponse = {
  errors: Record<string, string>
}

type TApiSuccessResponse<Data> = {
  data: Data
}

export type { TApiBaseResponse, TApiErrorResponse, TApiSuccessResponse }
