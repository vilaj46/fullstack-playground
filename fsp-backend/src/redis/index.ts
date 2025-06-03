import { createClient, RedisClientOptions } from "redis"

const config: RedisClientOptions = {
  username: process.env.REDIS_PROD_USERNAME ?? "",
  password: process.env.REDIS_PROD_PASSWORD ?? "",
  socket: {
    host: process.env.REDIS_PROD_SOCKET_HOST ?? "",
    port: Number(process.env.REDIS_PROD_SOCKET_PORT),
  },
}
// process.env.NODE_ENV !== "production"
//   ? { url: process.env.REDIS_DEV_URL }
//   : {
//       username: process.env.REDIS_PROD_USERNAME ?? "",
//       password: process.env.REDIS_PROD_PASSWORD ?? "",
//       socket: {
//         host: process.env.REDIS_PROD_SOCKET_HOST ?? "",
//         port: Number(process.env.REDIS_PROD_SOCKET_PORT),
//       },
//     }

const client = createClient(config)

client.on("error", (err) => {
  console.error("Redis Client Error:", err)

  if (err instanceof AggregateError) {
    for (const e of err.errors) {
      console.error("Inner error:", e)
    }
  }
})
const connectRedis = async () => {
  if (!client.isOpen) {
    try {
      await client.connect()
      console.log("✅ Redis connected")
    } catch (err) {
      console.error("❌ Redis failed to connect:", err)
      throw err
    }
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
