import { TTodo } from "@/shared/types"

import sql from "@/db"

import ApiError from "@/shared/classes/ApiError"

const getAllTodos = async (personId: number) => {
  try {
    return await sql`SELECT * FROM todo WHERE person_id = ${personId} ORDER BY id DESC;`
  } catch {
    throw new Error("Failed to fetch todos")
  }
}

const getTodosByLimitAndOffset = async (
  personId: number,
  params?: {
    filter?: string
    limit?: string
    offset?: string
    paginated?: string
    sorting?: string
  }
) => {
  let orderBy: string

  switch (params?.sorting) {
    case "id_desc":
      orderBy = "id DESC"
      break
    default:
      orderBy = "id ASC"
  }

  try {
    if (params?.filter?.length === 0 || !params?.filter) {
      return sql`SELECT * FROM todo WHERE person_id = ${personId} ORDER BY ${sql.unsafe(
        orderBy
      )} LIMIT ${params?.limit ?? 0} OFFSET ${params?.offset ?? 0};`
    }

    return sql`SELECT * FROM todo 
        WHERE person_id = ${personId} AND task ILIKE ${
      "%" + params?.filter + "%"
    }
        ORDER BY ${sql.unsafe(orderBy)} LIMIT ${params?.limit ?? 0} OFFSET ${
      params?.offset ?? 0
    };`
  } catch (error) {
    throw new Error(`Failed to fetch todos with limit and offset: ${error}`)
  }
}

const getTodosCount = async (personId: number, filter: string) => {
  try {
    if (filter.length === 0) {
      const [{ count }] = await sql`
        SELECT COUNT(*)::int AS count 
        FROM todo 
        WHERE person_id = ${personId};
      `
      return count
    }

    const [{ count }] = await sql`
      SELECT COUNT(*)::int AS count 
      FROM todo 
      WHERE person_id = ${personId} AND task ILIKE ${"%" + filter + "%"};
    `

    return count
  } catch (error) {
    throw new ApiError(400, {
      message: `Failed to fetch todos count: ${error}`,
    })
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
