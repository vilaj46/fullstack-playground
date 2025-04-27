import "dotenv/config"
import express from "express"
import cors from "cors"

const app = express()
const port = process.env.PORT || 8080

const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST"],
  origin:
    process.env.NODE_ENV === "development"
      ? process.env.FRONTEND_LOCAL_URL
      : process.env.FRONTEND_BASE_URL,
}

app.use(cors(corsOptions))
app.use(express.json())

app.get("/", (_req, res) => {
  res.status(200).json({
    result: "Hello, world!",
  })
})

app.get("/hello-world", (_req, res) => {
  res.send("Hello, world~")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`)
})
