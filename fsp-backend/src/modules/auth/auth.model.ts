import { eq } from "drizzle-orm"

import { TCredentialsDto } from "@/shared/types"

import db from "@/db"
import { personSchema } from "@/db/schemas"

const login = async (credentials: TCredentialsDto) => {
  try {
    const [user] = await db
      .select()
      .from(personSchema)
      .where(eq(personSchema.username, credentials.username))

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

    const [user] = await db
      .insert(personSchema)
      .values({
        username,
        password,
      })
      .returning()

    if (!user) {
      throw new Error(`Failed to signup`)
    }

    return user
  } catch (error) {
    throw new Error(`Failed to signup: ${error}`)
  }
}

export default {
  login,
  signup,
}
