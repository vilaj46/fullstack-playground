import getBlogPosts from "@/app/blog/utils"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Blog({ params }: Props) {
  const blogPosts = getBlogPosts()
  const { slug } = await params
  const blog = blogPosts.find((b) => b.slug === slug)

  if (!blog) {
    return <div>Blog not found.</div>
  }

  return (
    <div>
      <h1>{blog.title} :|</h1>
    </div>
  )
}
