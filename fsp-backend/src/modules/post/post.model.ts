import db from "@/db"
import { postSchema } from "@/db/schemas"
import { TPost } from "@/shared/types/post"
import { eq, sql } from "drizzle-orm"

const getAllPosts = async () => {
  try {
    const posts = await db.select().from(postSchema)
    return posts
  } catch {
    throw new Error("Failed to fetch posts")
  }
}

const likePost = async (id: TPost["id"]) => {
  try {
    const [post] = await db
      .update(postSchema)
      .set({
        likes: sql`${postSchema.likes} + 1`,
      })
      .where(eq(postSchema.id, id))
      .returning()
    return post
  } catch {
    throw new Error("Failed to like post")
  }
}

export default {
  getAllPosts,
  likePost,
}
