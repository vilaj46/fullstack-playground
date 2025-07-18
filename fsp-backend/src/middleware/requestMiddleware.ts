import { NextFunction } from "express"
import { ZodSchema } from "zod"

import { TRequest, TResponse } from "@/types"

const requestMiddleware =
  (schema: ZodSchema, property: "query") =>
  (
    request: TRequest,
    response: TResponse<{
      locals: {
        validatedQuery: unknown
      }
    }>,
    next: NextFunction
  ) => {
    try {
      const result = schema.parse(request[property])
      if (request[property] && typeof request[property] === "object") {
        if (property === "query") {
          response.locals.validatedQuery = result
        }
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default requestMiddleware
