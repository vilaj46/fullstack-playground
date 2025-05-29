import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}

const createSessionToken = (personId: number) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("Invalid secret key")
  }

  return jwt.sign({ personId }, process.env.SECRET_KEY, {
    expiresIn: "30m",
  })
}

const createRefreshToken = (personId: number) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("Invalid secret key")
  }

  const expiresIn = 7 * 24 * 60 * 60 * 1000

  const expiresAt = Date.now() + expiresIn
  const token = jwt.sign({ personId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  })

  return { expiresAt, personId, token }
}

const decodeToken = (token?: string) => {
  if (!token) {
    throw new Error("Invalid token")
  }

  return jwt.decode(token, {
    json: true,
  })
}

const getPersonIdFromToken = (token: string): number => {
  const decodedToken = decodeToken(token)

  if (!decodedToken) {
    throw new Error("Invalid token")
  }

  if (!("personId" in decodedToken)) {
    throw new Error("User does not exist")
  }

  return decodedToken.personId
}

const hashPassword = async (password: string) => {
  const saltRounds = 10

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    throw new Error(`Error hashing password: ${error}`)
  }
}

export {
  comparePasswords,
  createRefreshToken,
  createSessionToken,
  decodeToken,
  getPersonIdFromToken,
  hashPassword,
}
