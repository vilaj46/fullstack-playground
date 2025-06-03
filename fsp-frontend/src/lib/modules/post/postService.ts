import { getRequest, patchRequest } from "@/lib/utils/http-utils"
import type { TPost } from "@/shared/types/post"

const getPosts = async () => await getRequest<TPost[]>("/posts")

const likePost = async (id: TPost["id"]) =>
  await patchRequest(`/posts/${id}/like`)

const service = {
  getPosts,
  likePost,
}

export default service
