import { NextFunction } from "express"
import { ZodSchema } from "zod"

import { TRequest, TResponse } from "@/types"

const requestMiddleware =
  (schema: ZodSchema, property: "query") =>
  (request: TRequest, _response: TResponse, next: NextFunction) => {
    try {
      const result = schema.parse(request[property])
      if (request[property] && typeof request[property] === "object") {
        if (property === "query") {
          request.validatedQuery = result
        }
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default requestMiddleware
