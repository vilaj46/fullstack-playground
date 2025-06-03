import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query"

import postService from "@/lib/modules/post/postService"
import type { TPost } from "@/shared/types/post"

const queryKeys = {
  all: ["posts"],
} as Record<string, QueryKey>

const useGetPosts = () =>
  useQuery({
    queryFn: postService.getPosts,
    queryKey: queryKeys.all,
  })

const useLikePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: TPost["id"]) => postService.likePost(id),
    onMutate: (id) => {
      const previousPosts = queryClient.getQueryData<TPost[]>(queryKeys.all)
      queryClient.setQueryData<TPost[]>(queryKeys.all, (old = []) =>
        old.map((post) =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      )

      return { previousPosts }
    },
  })
}

export { useGetPosts, useLikePost }
