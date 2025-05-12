import type { TCredentialsDto } from "@/shared/types"

import { getRequest, postRequest } from "@/lib/utils/http-utils"

const getMe = async () => await getRequest("/me")

const login = async (credentials: TCredentialsDto) =>
  await postRequest<unknown, TCredentialsDto>("/login", credentials)

const postLogout = async () => await postRequest<unknown>("/logout")

export { getMe, login, postLogout }
