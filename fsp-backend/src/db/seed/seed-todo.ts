import db from "@/db"
import mocks from "@/db/mocks"
import { todoSchema } from "@/db/schemas"

export const createTodo = (
  personId: number,
  task: string,
  isCompleted = false
) => ({
  person_id: personId,
  task,
  completed: isCompleted,
})

const seedTodo = async (personId: number) => {
  console.info("[seed] Seeding todo...")
  const todos = Array.from({ length: 2000 }).map(() => {
    const todo = mocks.todos[Math.floor(Math.random() * mocks.todos.length)]
    return createTodo(personId, todo)
  })

  await db.insert(todoSchema).values(todos)
}

export default seedTodo
