import "dotenv/config"
import { sql } from "drizzle-orm"

import { hashPassword } from "@/modules/auth/auth.utils"
import db from "@/db"
import mocks from "@/db/mocks"
import { personSchema, todoSchema } from "@/db/schemas"

const createTodo = (personId: number, task: string, isCompleted = false) => ({
  person_id: personId,
  task,
  completed: isCompleted,
})

async function seedDatabase() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  try {
    // await db.execute(sql`DROP SCHEMA public CASCADE;`)
    // await db.execute(sql`CREATE SCHEMA public;`)

    const username = "julian"
    const password = await hashPassword("vila")

    const username2 = "test"
    const password2 = await hashPassword("test")

    const person = await db
      .insert(personSchema)
      .values([
        { username, password },
        { username: username2, password: password2 },
      ])
      .returning()

    const personId = person[0].id

    await db
      .insert(todoSchema)
      .values([
        createTodo(personId, "Pagination - limit / offset"),
        createTodo(personId, "Search / filter todos by status or date", true),
        createTodo(personId, "Activity logging / track updates", false),
        createTodo(personId, "File uploads", false),
        createTodo(personId, "Redis", false),
        createTodo(personId, "WebSockets", false),
      ])

    for (let i = 0; i < 2000; i++) {
      const randomIndex = Math.floor(Math.random() * mocks.todos.length)
      const todo = mocks.todos[randomIndex]
      await db.insert(todoSchema).values(createTodo(personId, todo))
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Seeding failed:", error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()
