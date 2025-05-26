import { asc, desc, eq } from "drizzle-orm"

import { todoSorting } from "@/shared/constants"

import { todoSchema } from "@/db/schemas"

const todoSortingMap = {
  [todoSorting.ALPHA_ASC]: asc(todoSchema.task),
  [todoSorting.ALPHA_DESC]: desc(todoSchema.task),
  [todoSorting.COMPLETED_ASC]: asc(eq(todoSchema.completed, true)),
  [todoSorting.COMPLETED_DESC]: desc(eq(todoSchema.completed, false)),
  [todoSorting.ID_ASC]: asc(todoSchema.id),
  [todoSorting.ID_DESC]: desc(todoSchema.id),
  [todoSorting.NONE]: desc(todoSchema.id),
} as const

export { todoSortingMap }
