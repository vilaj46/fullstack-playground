import postModel from "@/modules/post/post.model"
import { TPost } from "@/shared/types/post"

const getAllPosts = async () => await postModel.getAllPosts()

const likePost = async (id: TPost["id"]) => await postModel.likePost(id)

export default {
  getAllPosts,
  likePost,
}
