import { TTodo } from "@/shared/types"

import sql from "@/db"

const getAllTodos = async (personId: number) => {
  try {
    return await sql`SELECT * FROM todo WHERE person_id = ${personId} ORDER BY id DESC;`
  } catch {
    throw new Error("Failed to fetch todos")
  }
}

const getTodosByLimitAndOffset = async (
  personId: number,
  query: {
    limit: number
    offset: number
  }
) => {
  try {
    const { limit, offset } = query
    return sql`SELECT * FROM todo WHERE person_id = ${personId} ORDER BY id ASC LIMIT ${limit} OFFSET ${offset};`
  } catch (error) {
    throw new Error(`Failed to fetch todos with limit and offset: ${error}`)
  }
}

const getTodosCount = async (personId: number) => {
  try {
    const [{ count }] = await sql`
      SELECT COUNT(*)::int AS count 
      FROM todo 
      WHERE person_id = ${personId};
    `
    return count
  } catch (error) {
    throw new Error(`Failed to fetch todos count: ${error}`)
  }
}

const createTodo = async (personId: number, task: TTodo["task"]) => {
  try {
    const [todo] = await sql`
      INSERT INTO todo (task, person_id) VALUES (${task}, ${personId})
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

export default {
  getAllTodos,
  getTodosByLimitAndOffset,
  getTodosCount,
  createTodo,
  deleteTodo,
  toggleTodo,
}
