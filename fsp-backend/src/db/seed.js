require("dotenv").config()
const postgres = require("postgres")

const sql = postgres(
  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_CONTAINER}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
)

async function seedDatabase() {
  try {
    // Create table if it doesn't exist
    await dropTables()
    await sql`
      CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        task TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `

    // Insert sample data
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

// HELPERS

async function dropTables() {
  await sql`DROP SCHEMA public CASCADE;`
  await sql`CREATE SCHEMA public;`
}
