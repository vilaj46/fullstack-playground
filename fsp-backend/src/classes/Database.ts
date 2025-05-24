import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"

import { TNodeEnv } from "@/shared/types"

class Database {
  public db: NodePgDatabase
  private name: string
  private url: string

  constructor(TNodeEnv?: TNodeEnv) {
    this.name = this.computeDbName(TNodeEnv)
    this.url = this.computeDbUrl(this.name)
    this.db = drizzle(this.url)
  }

  private computeDbName(TNodeEnv?: TNodeEnv): string {
    if (TNodeEnv === "test") {
      return process.env.POSTGRES_TEST_DB ?? ""
    }
    return process.env.POSTGRES_DB ?? ""
  }

  private computeDbUrl(name: string): string {
    const username = process.env.POSTGRES_USERNAME ?? ""
    const password = process.env.POSTGRES_PASSWORD ?? ""
    const container = process.env.POSTGRES_CONTAINER ?? ""
    const port = process.env.POSTGRES_PORT ?? "5432"
    return `postgres://${username}:${password}@${container}:${port}/${name}`
  }

  getDbName(): string {
    return this.name
  }

  getDbUrl(): string {
    return this.url
  }
}

export default Database
