import { TTodo } from "@/shared/types"

import sql from "@/db"

const getAllTodos = async () => {
  try {
    return await sql`SELECT * FROM todo ORDER BY id DESC;`
  } catch {
    throw new Error("Failed to fetch todos")
  }
}

const createTodo = async (task: TTodo["task"]) => {
  try {
    const [todo] = await sql`
      INSERT INTO todo (task) VALUES (${task})
      RETURNING *;
    `

    if (!todo) {
      throw new Error("Failed to create todo")
    }

    return todo
  } catch (error) {
    throw new Error(`Failed to create todo: ${error}`)
  }
}

const deleteTodo = async (id: TTodo["id"]) => {
  try {
    const [todo] = await sql`
      DELETE FROM todo WHERE id = ${id}
      RETURNING *;
    `

    if (!todo) {
      throw new Error("Failed to delete todo")
    }

    return todo
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error}`)
  }
}

const toggleTodo = async (id: TTodo["id"]) => {
  try {
    const [todo] = await sql`
      UPDATE todo
      SET completed = NOT completed
      WHERE id = ${id}
      RETURNING *;
    `
    if (!todo) {
      throw new Error("Failed to toggle todo")
    }

    return todo
  } catch (error) {
    throw new Error(`Failed to toggle todo: ${error}`)
  }
}

export default { getAllTodos, createTodo, deleteTodo, toggleTodo }
