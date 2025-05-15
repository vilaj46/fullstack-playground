type TCredentialsDto = {
  password: string
  username: string
}

type TPersonResponse = {
  personId: number
  iat: number
  exp: number
}

export type { TCredentialsDto, TPersonResponse }
