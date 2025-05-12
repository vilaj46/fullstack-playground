import jwt from "jsonwebtoken"

const createSessionToken = (personId: number) => {
  if (!process.env.SECRET_KEY) {
    throw new Error("Invalid secret key")
  }
  return jwt.sign({ userId: personId }, process.env.SECRET_KEY, {
    expiresIn: "30m",
  })
}

export { createSessionToken }
