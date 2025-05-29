import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

const personSchema = pgTable("person", {
  id: serial().primaryKey(),
  username: text().notNull().unique(),
  password: text().notNull(),
})

const refreshTokenSchema = pgTable("refresh_token", {
  created_at: timestamp().defaultNow(),
  id: serial().primaryKey(),
  expires_at: timestamp(),
  person_id: integer().references(() => personSchema.id, {
    onDelete: "cascade",
  }),
  token: text().notNull(),
})

const todoSchema = pgTable("todo", {
  completed: boolean().default(false),
  id: serial().primaryKey(),
  person_id: integer().references(() => personSchema.id, {
    onDelete: "cascade",
  }),
  task: text().notNull(),
})

export { personSchema, refreshTokenSchema, todoSchema }
