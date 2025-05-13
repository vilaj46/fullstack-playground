import { TCredentialsDto } from "@/shared/types"

import sql from "@/db"

const login = async (credentials: TCredentialsDto) => {
  try {
    const [user] =
      await sql`SELECT * FROM person WHERE username = ${credentials.username}`

    if (!user) {
      throw new Error("Failed to login")
    }

    return user
  } catch (error) {
    throw new Error(`Failed to login: ${error}`)
  }
}

const signup = async (credentials: TCredentialsDto) => {
  try {
    const { username, password } = credentials
    const [user] = await sql`INSERT INTO person (username, password) 
                VALUES (${username}, ${password})
                RETURNING *;`

    if (!user) {
      throw new Error(`Failed to signup`)
    }

    return user
  } catch (error) {
    throw new Error(`Failed to signup: ${error}`)
  }
}

export default { login, signup }
