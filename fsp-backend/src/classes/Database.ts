import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"

import { TNodeEnv } from "@/shared/types"

class Database {
  public db: NodePgDatabase = {} as NodePgDatabase
  private name: string
  private url: string

  constructor(nodeEnv?: TNodeEnv) {
    this.name = this.computeDbName(nodeEnv)
    this.url = this.computeDbUrl(this.name)

    console.log(`🔌 Connecting to DB: ${this.url}`)
    try {
      this.db = drizzle(this.url)
      console.log(`✅ Connected to DB: ${this.url}`)
    } catch (error) {
      console.error("❌ Failed to connect to DB:", error)
    }
  }

  private computeDbName(nodeEnv?: TNodeEnv): string {
    return nodeEnv === "test"
      ? this.getEnvOrThrow("POSTGRES_TEST_DB")
      : this.getEnvOrThrow("POSTGRES_DB")
  }

  private computeDbUrl(name: string): string {
    const username = this.getEnvOrThrow("POSTGRES_USERNAME")
    const password = this.getEnvOrThrow("POSTGRES_PASSWORD")
    const container = this.getEnvOrThrow("POSTGRES_CONTAINER")
    const port = this.getEnvOrThrow("POSTGRES_PORT")
    return new URL(
      `postgres://${username}:${password}@${container}:${port}/${name}`
    ).toString()
  }

  getDbName(): string {
    return this.name
  }

  getDbUrl(): string {
    return this.url
  }

  getEnvOrThrow(key: string): string {
    const value = process.env[key]
    if (!value) {
      throw new Error(`Missing env variable: ${key}`)
    }

    return value
  }
}

export default Database
