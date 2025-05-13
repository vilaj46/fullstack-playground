type TCredentialsDto = {
  password: string
  username: string
}

type TPersonResponse = {
  userId: number
  iat: number
  exp: number
}

export type { TCredentialsDto, TPersonResponse }
