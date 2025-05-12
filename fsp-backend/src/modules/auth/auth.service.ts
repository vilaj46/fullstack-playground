import { TCredentialsDto } from "@/shared/types"

import authModel from "@/modules/auth/auth.model"

const login = (credentials: TCredentialsDto) => authModel.login(credentials)

export default { login }
