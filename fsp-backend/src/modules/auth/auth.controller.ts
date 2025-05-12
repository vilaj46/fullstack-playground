import { NextFunction } from "express"

import { TCredentialsDto } from "@/shared/types"

import { TRequest, TResponse } from "@/types"

import authService from "@/modules/auth/auth.service"
import { createSessionToken } from "@/modules/auth/auth.utils"

const login = async (
  request: TRequest<{
    reqBody: TCredentialsDto
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const user = await authService.login(request.body)

    if (!("id" in user)) {
      throw new Error("Failed to assign token")
    }

    const token = createSessionToken(user.id)

    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    })

    response.status(200).json({
      message: "all good",
    })
  } catch (error) {
    next(error)
  }
}

export default { login }
