import db from "@/db"
import { postSchema } from "@/db/schemas"

const seedPost = async () => {
  console.info("[seed] Seeding post...")
  await db.insert(postSchema).values([
    {
      title: "Test Title",
    },
  ])
}

export default seedPost
