import fs from "fs"
import matter from "gray-matter"
import path from "path"

import { Blog } from "@/app/blog/types"

const POSTS_DIR = ["src", "app", "blog", "posts"]

export default function (): Array<Blog> {
  const basePath = path.join(process.cwd(), ...POSTS_DIR)
  const filenames = fs.readdirSync(basePath)

  const posts = filenames.map((filename) => {
    const post = fs.readFileSync(`${basePath}/${filename}`, "utf8")
    const { content, data } = matter(post)
    const slug = filename.split(".mdx")[0]
    return {
      content,
      publishedAt: data.publishedAt,
      slug,
      summary: data.summary,
      title: data.title,
    }
  })

  return posts
}
