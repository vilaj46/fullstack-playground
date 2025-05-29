import { NextFunction } from "express"
import jwt from "jsonwebtoken"

import { TCredentialsDto } from "@/shared/types"

import { TRequest, TResponse } from "@/types"

import authService from "@/modules/auth/auth.service"
import { createSessionToken, decodeToken } from "@/modules/auth/auth.utils"
import db from "@/db"
import { refreshTokenSchema } from "@/db/schemas"
import { and, eq } from "drizzle-orm"

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

const postRefreshToken = async (
  request: TRequest,
  response: TResponse,
  next: NextFunction
) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("No secret key")
    }

    const verified = jwt.verify(
      request.cookies.refreshToken,
      process.env.SECRET_KEY
    )

    if (!(verified && typeof verified === "object")) {
      throw new Error("invalid token")
    }

    const [refreshToken] = await db
      .select()
      .from(refreshTokenSchema)
      .where(
        and(
          eq(refreshTokenSchema.token, request.cookies.refreshToken),
          eq(refreshTokenSchema.person_id, verified.personId)
        )
      )

    if (!refreshToken) {
      throw new Error("Invalid token")
    }

    const verifiedRefreshToken = jwt.verify(
      refreshToken.token,
      process.env.SECRET_KEY
    )

    if (typeof verifiedRefreshToken !== "object") {
      throw new Error("Invalid refresh token")
    }

    const token = createSessionToken(verifiedRefreshToken.personId)

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

    const refreshToken = await authService.postRefreshToken(user.id)

    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    })

    response.cookie("refreshToken", refreshToken.token, {
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
    response.clearCookie("refreshToken")
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

export default {
  getPerson,
  postLogin,
  postLogout,
  postRefreshToken,
  postSignup,
}
