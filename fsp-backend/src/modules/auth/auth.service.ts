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

const postRefreshToken = async (personId: number) => {
  const refreshToken = createRefreshToken(personId)

  await authModel.postRefreshToken(refreshToken)

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
