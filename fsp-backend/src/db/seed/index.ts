import "dotenv/config"
import { sql } from "drizzle-orm"

import db from "@/db"
import seedTodo from "@/db/seed/seed-todo"
import seedPerson from "@/db/seed/seed-person"

async function seedDatabase() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  try {
    await db.execute(sql`
      TRUNCATE TABLE person, todo RESTART IDENTITY CASCADE; 
    `)
    const persons = await seedPerson()
    await seedTodo(persons[0].id)
    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Seeding failed:", error)
  }
}

seedDatabase()
