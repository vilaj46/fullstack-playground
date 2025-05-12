import { TCredentialsDto } from "@/shared/types"

import sql from "@/db"

const login = async (credentials: TCredentialsDto) => {
  try {
    const [user] =
      await sql`SELECT * FROM person WHERE username = ${credentials.username}`

    const isValidPassword = credentials.password === user.password

    if (!user || !isValidPassword) {
      throw new Error("Failed to login")
    }

    return user
  } catch (error) {
    throw new Error(`Failed to login: ${error}`)
  }
}

export default { login }
