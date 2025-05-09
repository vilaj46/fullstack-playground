import { Request, Response } from "express"

type TRequest<
  T extends Partial<{
    params?: Request["params"]
    resBody?: any
    reqBody?: Request["body"]
    reqQuery?: Request["query"]
    locals?: Record<string, any>
  }> = {}
> = Request<
  T["params"],
  T["resBody"],
  T["reqBody"],
  T["reqQuery"],
  T["locals"] extends Record<string, any> ? T["locals"] : Record<string, any>
>

type TResponse<
  T extends Partial<{
    resBody?: any
    locals?: Record<string, any>
  }> = {}
> = Response<
  T["resBody"],
  T["locals"] extends Record<string, any> ? T["locals"] : Record<string, any>
>

export type { TRequest, TResponse }
