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

  const allowedOrigins = [
    process.env.FRONTEND_LOCAL_URL,
    process.env.FRONTEND_BASE_URL,
  ]

  const corsOptions = {
    allowedHeaders: ["Authorization", "Cache-Control", "Content-Type"],
    credentials: true,
    methods: ["DELETE", "GET", "PATCH", "POST"],
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean | string) => void
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
  }

  let redisClient
  try {
    redisClient = await connectRedis()
    console.log("✅ Connected to Redis")
  } catch (err) {
    console.error("❌ Redis connection failed:", err)
    process.exit(1)
  }
  app.set("redisClient", redisClient)

  app.use(cors(corsOptions))

  if (process.env.NODE_ENV !== "production") {
    app.options("/static", cors(corsOptions))
    app.use(
      "/static",
      express.static("public-cdn", {
        setHeaders: (res, _path, _stat) => {
          const requestOrigin = res.req.headers.origin

          if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
            res.setHeader("Access-Control-Allow-Origin", requestOrigin)
            res.setHeader("Access-Control-Allow-Credentials", "true")
          } else {
            res.setHeader("Access-Control-Allow-Origin", "null")
          }

          res.setHeader("Cache-Control", "public, max-age=31536000")
        },
      })
    )
  }
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
