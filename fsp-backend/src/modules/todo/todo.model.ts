import { and, eq, desc, ilike, sql } from "drizzle-orm"

import { TTodo } from "@/shared/types"

import { TGetTodosQuery } from "@/modules/todo/todo.types"

import { todoSorting } from "@/shared/constants"
import { todoSortingMap } from "@/modules/todo/todo.constants"

import { todoSchema } from "@/db/schemas"

import { ApiError } from "@/shared/classes"

import db from "@/db"

const getAllTodos = async (personId: number) => {
  try {
    return db
      .select()
      .from(todoSchema)
      .where(eq(todoSchema.person_id, personId))
      .orderBy(desc(todoSchema.id))
  } catch {
    throw new Error("Failed to fetch todos")
  }
}

const getTodosByLimitAndOffset = async (
  personId: number,
  params: TGetTodosQuery
) => {
  const { filter, limit, offset, sorting } = params

  try {
    const where = [eq(todoSchema.person_id, personId)]

    if (filter.length > 0) {
      where.push(ilike(todoSchema.task, `%${filter}%`))
    }

    const todos = await db
      .select()
      .from(todoSchema)
      .where(and(...where))
      .orderBy(todoSortingMap[sorting] ?? todoSortingMap[todoSorting.NONE])
      .offset(offset)
      .limit(limit)

    return todos
  } catch (error) {
    throw new Error(
      `Failed to fetch todos with limit and offset: ${String(error)}`
    )
  }
}

const getTodosCount = async (personId: number, filter: string) => {
  try {
    if (filter.length > 0) {
      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(todoSchema)
        .where(
          and(
            eq(todoSchema.person_id, personId),
            ilike(todoSchema.task, `%${filter}%`)
          )
        )

      return count
    }

    const [{ count }] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(todoSchema)
    return count
  } catch (error) {
    throw new ApiError(400, {
      message: `Failed to fetch todos count: ${error}`,
    })
  }
}

const createTodo = async (personId: number, task: TTodo["task"]) => {
  try {
    const [todo] = await db
      .insert(todoSchema)
      .values({
        person_id: personId,
        task,
      })
      .returning()

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
    const [todo] = await db
      .delete(todoSchema)
      .where(eq(todoSchema.id, id))
      .returning()

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
    const [todo] = await db
      .update(todoSchema)
      .set({
        completed: sql`NOT ${todoSchema.completed}`,
      })
      .where(eq(todoSchema.id, id))
      .returning()

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
