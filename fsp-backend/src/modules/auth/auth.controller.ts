import { NextFunction } from "express"

import { TCredentialsDto } from "@/shared/types"

import { TRequest, TResponse } from "@/types"

import authService from "@/modules/auth/auth.service"
import { createSessionToken, decodeToken } from "@/modules/auth/auth.utils"

const getPerson = async (
  request: TRequest,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const { token } = request.cookies
    const decoded = decodeToken(token)
    response.status(200).json(decoded)
  } catch (error) {
    next(error)
  }
}

const postLogin = async (
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

    const decoded = decodeToken(token)

    response.status(200).json(decoded)
  } catch (error) {
    next(error)
  }
}

const postLogout = async (
  _request: TRequest,
  response: TResponse,
  next: NextFunction
) => {
  try {
    response.clearCookie("token")
    response.status(200).json({
      message: "Logged out successfully",
    })
  } catch (error) {
    next(error)
  }
}

const postSignup = async (
  request: TRequest<{
    reqBody: TCredentialsDto
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const user = await authService.signup(request.body)

    if (!("id" in user)) {
      throw new Error("Failed to assign token")
    }

    const token = createSessionToken(user.id)

    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    })

    const decoded = decodeToken(token)

    response.status(200).json(decoded)
  } catch (error) {
    next(error)
  }
}

export default { getPerson, postLogin, postLogout, postSignup }
