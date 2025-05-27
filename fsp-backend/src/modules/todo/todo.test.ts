import "dotenv/config"
import type { App } from "supertest/types"

import request from "supertest"

import { createApp } from "@/index"
import { Database } from "@/classes"
import { TTodo } from "@/shared/types"
import { personSchema, todoSchema } from "@/db/schemas"
import { createPerson } from "@/db/seed/seed-person"
import { createTodo } from "@/db/seed/seed-todo"
import { sql } from "drizzle-orm"

describe("test todo functionality", () => {
  let app: App | null = null
  let cookie: string

  beforeAll(async () => {
    app = createApp()

    const db = new Database("test").db

    await db.execute(sql`TRUNCATE TABLE person RESTART IDENTITY CASCADE`)

    const persons = await db
      .insert(personSchema)
      .values([await createPerson("test", "test")])
      .returning()

    await db
      .insert(todoSchema)
      .values([
        createTodo(persons[0].id, "Test"),
        createTodo(persons[0].id, "Test2", true),
        createTodo(persons[0].id, "Test3"),
      ])

    const loginResponse = await request(app)
      .post("/login")
      .send({
        username: "test",
        password: "test",
      })
      .expect(200)

    cookie = loginResponse.headers["set-cookie"][0]
  })

  it("get todos with correct properties", async () => {
    if (!app) {
      return
    }

    const response = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)

    const todos = response.body.data

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

    const response = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)
    const currentLength = response.body.data.length

    await request(app)
      .post("/todos")
      .send({
        task: "Task Number",
      })
      .set("Cookie", cookie)
      .expect(200)

    const responseAfterPost = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)
    const lengthAfterPost = responseAfterPost.body.data.length
    expect(lengthAfterPost).toBe(currentLength + 1)
  })

  it("deletes a todo", async () => {
    if (!app) {
      return
    }

    const response = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)
    const todoForDeletion = response.body.data[0]
    const lengthBeforeDeletion = response.body.data.length

    await request(app)
      .delete(`/todos/${todoForDeletion.id}`)
      .set("Cookie", cookie)
      .expect(204)

    const responseAfterDeletion = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)

    const deletedTodo = responseAfterDeletion.body.data.find(
      (todo: TTodo) => todo.id === todoForDeletion.id
    )

    expect(deletedTodo).toBe(undefined)
    expect(responseAfterDeletion.body.data.length).toBe(
      lengthBeforeDeletion - 1
    )
  })

  it("toggles a todo completion", async () => {
    if (!app) {
      return
    }

    const response = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)
    const todo: TTodo = response.body.data[0]

    await request(app)
      .patch(`/todos/${todo.id}`)
      .set("Cookie", cookie)
      .expect(200)

    const responseAfterToggle = await request(app)
      .get("/todos")
      .set("cookie", cookie)
      .expect(200)
    const todoAfterToggle = responseAfterToggle.body.data[0]

    expect(todoAfterToggle.completed).toBe(!todo.completed)
  })
})
