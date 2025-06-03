import express from "express"

import controller from "@/modules/post/post.controller"

const router = express.Router()

router.get("/posts", controller.getAllPosts)
router.patch("/posts/:id/like", controller.likePost)

export default router
