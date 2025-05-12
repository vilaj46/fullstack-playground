import "dotenv/config"
import postgres from "postgres"
import request from "supertest"
import type { App } from "supertest/types"

import { createApp } from "@/index"
import { TTodo } from "@/shared/types"

describe("test todo functionality", () => {
  let app: App | null = null
  let sql: postgres.Sql<{}>

  beforeAll(async () => {
    app = createApp()
    sql = postgres(
      `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_CONTAINER}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_TEST_DB}`
    )

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
          INSERT INTO person (username, password) VALUES
          ('julian', 'vila')
        `
    await sql`
          INSERT INTO todo (task, completed) VALUES
          ('Finish Docker setup', FALSE),
          ('Write seed script', TRUE),
          ('Test backend integration', FALSE);
        `
  })

  it("get todos with correct properties", async () => {
    if (!app) {
      return
    }

    const response = await request(app).get("/todos").expect(200)
    const todos = response.body

    expect(todos.length).toBe(3)

    const todo = todos[0]

    expect(todo).toHaveProperty("task")
    expect(todo).toHaveProperty("completed")

    expect(typeof todo.task).toBe("string")
    expect(typeof todo.completed).toBe("boolean")
  })

  it("posts a todo", async () => {
    if (!app) {
      return
    }

    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: "julian",
        password: "vila",
      })
      .expect(200)

    const cookie = loginResponse.headers["set-cookie"][0]

    const getResponse = await request(app).get("/todos").expect(200)
    const currentLength = getResponse.body.length

    await request(app)
      .post("/todos")
      .send({
        task: "Task Number",
      })
      .set("Cookie", cookie)
      .expect(200)

    const getResponseAfterPost = await request(app).get("/todos").expect(200)
    const lengthAfterPost = getResponseAfterPost.body.length
    expect(lengthAfterPost).toBe(currentLength + 1)
  })

  it("deletes a todo", async () => {
    if (!app) {
      return
    }

    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: "julian",
        password: "vila",
      })
      .expect(200)

    const cookie = loginResponse.headers["set-cookie"][0]

    const getResponse = await request(app).get("/todos").expect(200)
    const todoForDeletion = getResponse.body[0]

    await request(app)
      .delete(`/todos/${todoForDeletion.id}`)
      .set("Cookie", cookie)
      .expect(204)

    const getResponseAfterDeletion = await request(app)
      .get("/todos")
      .expect(200)

    const deletedTodo = getResponseAfterDeletion.body.find(
      (todo: TTodo) => todo.id === todoForDeletion.id
    )

    expect(deletedTodo).toBe(undefined)
    expect(getResponseAfterDeletion.body.length).toBe(3)
  })

  it("toggles a todo completion", async () => {
    if (!app) {
      return
    }

    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: "julian",
        password: "vila",
      })
      .expect(200)

    const cookie = loginResponse.headers["set-cookie"][0]

    const getResponse = await request(app).get("/todos").expect(200)
    const todo: TTodo = getResponse.body[0]

    await request(app)
      .patch(`/todos/${todo.id}`)
      .set("Cookie", cookie)
      .expect(200)

    const getResponseAfterToggle = await request(app).get("/todos").expect(200)
    const todoAfterToggle = getResponseAfterToggle.body[0]

    expect(todoAfterToggle.completed).toBe(!todo.completed)
  })

  afterAll(async () => {
    if (!sql) {
      return
    }
    await sql.end()
  })
})
