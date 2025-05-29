import { ApiError } from "@/shared/classes"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const authMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const { token } = request.cookies

  if (!process.env.SECRET_KEY) {
    throw new Error("Invalid token")
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (error) {
    throw new ApiError(401, {
      message: `Failed to verify token: ${error}`,
    })
  }
}

export default authMiddleware
