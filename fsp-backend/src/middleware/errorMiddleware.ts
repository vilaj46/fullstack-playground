import { NextFunction, Request, Response } from "express"

type CustomError = {
  status?: number
} & Error

const errorMiddleware = (
  error: CustomError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const message = error.message || "Internal Server Error"
  const status = error.status ?? 500

  response.status(status).json({
    status: "error",
    errors: {
      message,
    },
  })
}

export default errorMiddleware
