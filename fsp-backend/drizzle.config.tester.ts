import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    database: process.env.POSTGRES_TEST_DB ?? "",
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT ?? 5432,
    host: process.env.POSTGRES_CONTAINER ?? "",
    ssl: false,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schemas.ts",
})
