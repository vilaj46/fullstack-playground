import { createClient } from "redis"

const client = createClient({
  url: process.env.REDIS_URL,
})

client.on("error", (err) => console.log("Redis Client Error", err))

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}

process.on("SIGINT", async () => {
  if (client.isOpen) {
    await client.quit()
  }
  process.exit(0)
})

export default connectRedis
