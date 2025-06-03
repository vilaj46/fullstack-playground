import { RedisClientType } from "@redis/client"

import { TCredentialsDto } from "@/shared/types"

import authModel from "@/modules/auth/auth.model"
import {
  comparePasswords,
  createRefreshToken,
  hashPassword,
} from "@/modules/auth/auth.utils"

const login = async (credentials: TCredentialsDto) => {
  const user = await authModel.login(credentials)

  const isValidPassword = await comparePasswords(
    credentials.password,
    user.password
  )

  if (!isValidPassword) {
    throw new Error("Failed to login")
  }

  return user
}

const postRefreshToken = async (
  redisClient: RedisClientType,
  personId: number
) => {
  const refreshToken = createRefreshToken(personId)

  const key = `person:${personId}:token`
  await redisClient.hSet(key, refreshToken)
  await redisClient.expire(key, 604800) // 7 days same as token

  return refreshToken
}

const signup = async (credentials: TCredentialsDto) => {
  const hashedPassword = await hashPassword(credentials.password)

  return authModel.signup({
    ...credentials,
    password: hashedPassword,
  })
}

export default { login, postRefreshToken, signup }
