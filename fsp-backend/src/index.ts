import "dotenv/config"
import express from "express"
import cors from "cors"

const app = express()
const port = process.env.PORT || 8080

// TODO: Only allow our client
app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Hello, world!")
})

app.get("/hello-world", (_req, res) => {
  res.send("Hello, world~")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`)
})
