import { Request, Response } from "express"

import ApiError from "@/shared/classes/ApiError"

const errorMiddleware = (
  error: ApiError<Record<string, unknown>>,
  _request: Request,
  response: Response
) => {
  const message = error.message || "Internal Server Error"
  const status = error?.statusCode ?? 500

  response.status(status).json({
    status: "error",
    errors: {
      message,
      ...error.errors,
    },
  })
}

export default errorMiddleware
