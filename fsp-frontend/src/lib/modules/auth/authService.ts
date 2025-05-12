import type { TCredentialsDto } from "@/shared/types"

import { postRequest } from "@/lib/utils/http-utils"

const login = async (credentials: TCredentialsDto) =>
  await postRequest<unknown, TCredentialsDto>("/login", credentials)

export { login }
