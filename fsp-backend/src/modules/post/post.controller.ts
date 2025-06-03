import { NextFunction, Request, Response } from "express"

import postService from "@/modules/post/post.service"
import { TRequest, TResponse } from "@/types"

const getAllPosts = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await postService.getAllPosts()
    response.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

const likePost = async (
  request: TRequest<{
    params: {
      id: string
    }
  }>,
  response: TResponse,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id)

    if (!id) {
      throw new Error("Invalid id")
    }

    const post = await postService.likePost(id)
    response.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllPosts,
  likePost,
}
