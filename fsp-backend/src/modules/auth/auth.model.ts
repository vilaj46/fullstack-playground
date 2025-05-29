import { eq } from "drizzle-orm"

import { TCredentialsDto } from "@/shared/types"

import db from "@/db"
import { personSchema, refreshTokenSchema } from "@/db/schemas"

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

const postRefreshToken = async (refreshToken: {
  expiresAt: number
  personId: number
  token: string
}) => {
  try {
    await db.insert(refreshTokenSchema).values({
      expires_at: new Date(refreshToken.expiresAt),
      person_id: refreshToken.personId,
      token: refreshToken.token,
    })
  } catch (error) {
    throw new Error(`Failed to store refresh token: ${error}`)
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

export default { login, postRefreshToken, signup }
