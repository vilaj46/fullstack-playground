import Link from "next/link"

import getBlogPosts from "@/app/blog/utils"

export default function Blogs() {
  const blogPosts = getBlogPosts()

  return (
    <div>
      <h1>Blogs :|</h1>
      <ol>
        {blogPosts.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
