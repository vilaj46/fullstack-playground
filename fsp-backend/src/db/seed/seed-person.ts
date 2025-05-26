import db from "@/db"
import { hashPassword } from "@/modules/auth/auth.utils"
import { personSchema } from "@/db/schemas"

const createPerson = async (username: string, password: string) => {
  const passwordHash = await hashPassword(password)
  return {
    username,
    password: passwordHash,
  }
}

const seedPerson = async () => {
  console.info("[seed] Seeding person...")
  const values = [await createPerson("test", "test")]
  const persons = await db.insert(personSchema).values(values).returning()
  return persons
}

export default seedPerson
