import postgres from "postgres"

const sql = postgres(
  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_CONTAINER}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
)

export default sql
