import postgres from "postgres"

const db =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_TEST_DB
    : process.env.POSTGRES_DB

export default postgres(
  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_CONTAINER}:${process.env.POSTGRES_PORT}/${db}`
)
