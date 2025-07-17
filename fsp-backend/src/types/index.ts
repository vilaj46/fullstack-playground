import { Request, Response } from "express"

type TRequest<
  T extends Partial<{
    params?: Request["params"]
    resBody?: unknown
    reqBody?: Request["body"]
    reqQuery?: Request["query"]
    locals?: Record<string, unknown>
    validatedQuery?: Record<string, unknown>
  }> = object
> = Request<
  T["params"],
  T["resBody"],
  T["reqBody"],
  T["reqQuery"],
  T["locals"] extends Record<string, unknown>
    ? T["locals"]
    : Record<string, unknown>
> & {
  validatedQuery?: T["validatedQuery"]
}

type TResponse<
  T extends Partial<{
    resBody?: unknown
    locals?: Record<string, unknown>
  }> = object
> = Response<
  T["resBody"],
  T["locals"] extends Record<string, unknown>
    ? T["locals"]
    : Record<string, unknown>
>

export type { TRequest, TResponse }
