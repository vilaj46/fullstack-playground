import { useGetPosts, useLikePost } from "@/lib/modules/post/postHooks"
import type { TPost } from "@/shared/types/post"

const PostList = () => {
  const postQuery = useGetPosts()
  const likePost = useLikePost()

  if (postQuery.isFetching) {
    return <div>Fetching...</div>
  }

  const handleLikeClick = (id: TPost["id"]) => {
    likePost.mutate(id)
  }

  return (
    <ul>
      {postQuery.data?.map((post, index) => (
        <li className="flex flex-row gap-8" key={post.id}>
          <span>
            {index + 1}. {post.title}
          </span>
          <button
            className="border hover:cursor-pointer px-4"
            data-id={post.id}
            onClick={() => handleLikeClick(post.id)}
          >
            Likes: {post.likes}
          </button>
        </li>
      ))}
    </ul>
  )
}

export { PostList }
