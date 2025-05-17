import "dotenv/config"

import { hashPassword } from "../modules/auth/auth.utils"
import mocks from "./mocks"
import sql from "./index"

async function seedDatabase() {
  if (process.env.NODE_ENV === "test") {
    console.log("Test environment -- not seeding.")
    return
  }

  try {
    await sql`DROP SCHEMA public CASCADE;`
    await sql`CREATE SCHEMA public;`

    await sql`
      CREATE TABLE IF NOT EXISTS person (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `
    await sql`
      CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        task TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        person_id INTEGER REFERENCES person(id) ON DELETE CASCADE
      );
    `

    const username = "julian"
    const password = await hashPassword("vila")

    const username2 = "test"
    const password2 = await hashPassword("test")

    const [person] = await sql`
      INSERT INTO person (username, password) VALUES
      (${username}, ${password}),
      (${username2}, ${password2})
      RETURNING *;
    `

    const personId = person.id

    await sql`
      INSERT INTO todo (task, completed, person_id) VALUES
      ('Pagination - limit / offset', FALSE, ${personId}),
      ('Search / filter todos by status or date', TRUE, ${personId}),
      ('Activity logging / track updates', FALSE, ${personId}),
      ('File uploads', FALSE, ${personId}),
      ('Redis', FALSE, ${personId}),
      ('WebSockets', FALSE, ${personId});
    `

    for (let i = 0; i < 2000; i++) {
      const randomIndex = Math.floor(Math.random() * mocks.todos.length)
      const todo = mocks.todos[randomIndex]

      await sql`
        INSERT INTO todo (task, completed, person_id) VALUES
        (${todo}, FALSE, ${personId});
      `
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Seeding failed:", error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()
