import type { TCredentialsDto, TPersonResponse } from "@/shared/types"

import { getRequest, postRequest } from "@/lib/utils/http-utils"

const getPerson = async () => await getRequest<TPersonResponse>("/person")

const postLogin = async (credentials: TCredentialsDto) =>
  await postRequest<TPersonResponse, TCredentialsDto>("/login", credentials)

const postLogout = async () =>
  await postRequest<{
    message: string
  }>("/logout")

const postSignup = async (credentials: TCredentialsDto) =>
  await postRequest<TPersonResponse, TCredentialsDto>("/signup", credentials)

export { getPerson, postLogin, postLogout, postSignup }
