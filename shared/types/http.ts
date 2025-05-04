type TApiBaseResponse = {
  code: number
  message?: string
}

type TApiErrors = {
  message: string
} & Record<string, string>

type TApiErrorResponse = {
  errors: TApiErrors
  status: "error"
}

type TApiSuccessResponse<Data> = {
  result: Data
  status: "success"
}

type TApiResponse<Data> = TApiBaseResponse &
  (TApiErrorResponse | TApiSuccessResponse<Data>)

export type { TApiResponse, TApiErrorResponse, TApiSuccessResponse }
