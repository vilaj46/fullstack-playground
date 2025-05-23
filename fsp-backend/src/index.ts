import "dotenv/config"
import "tsconfig-paths/register"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import routes from "@/routes"

import { errorMiddleware } from "@/middleware"

export const createApp = () => {
  const app = express()
  const port = process.env.PORT || 8080

  const corsOptions = {
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
    methods: ["DELETE", "GET", "PATCH", "POST"],
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.FRONTEND_LOCAL_URL
        : process.env.FRONTEND_BASE_URL,
  }

  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(express.json())
  app.use(routes)
  app.use(errorMiddleware)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`)
  })

  return app
}

createApp()
