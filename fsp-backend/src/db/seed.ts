import "dotenv/config"

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
        completed BOOLEAN DEFAULT FALSE
      );
    `

    await sql`
      INSERT INTO todo (task, completed) VALUES
      ('Finish Docker setup', FALSE),
      ('Write seed script', TRUE),
      ('Test backend integration', FALSE);
    `

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Seeding failed:", error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()
