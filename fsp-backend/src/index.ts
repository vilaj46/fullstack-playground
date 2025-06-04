import "dotenv/config"
import "tsconfig-paths/register"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectRedis from "@/redis"
import { errorMiddleware } from "@/middleware"

import routes from "@/routes"

export const createApp = async () => {
  const app = express()
  const port = Number(process.env.PORT) || 8080

  const corsOptions = {
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
    methods: ["DELETE", "GET", "PATCH", "POST"],
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.FRONTEND_LOCAL_URL
        : process.env.FRONTEND_BASE_URL,
  }

  let redisClient
  try {
    redisClient = await connectRedis()
    console.log("✅ Connected to Redis")
  } catch (err) {
    console.error("❌ Redis connection failed:", err)
    process.exit(1) // fail early if Redis is required
  }
  app.set("redisClient", redisClient)

  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(express.json())
  app.use(routes)
  app.use(errorMiddleware)

  app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}.`)
  })

  return app
}

createApp()
