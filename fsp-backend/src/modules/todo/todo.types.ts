import { z } from "zod"

import { GetTodosSchema } from "@/modules/todo/todo.schemas"

type TGetTodosQuery = z.infer<typeof GetTodosSchema>

export type { TGetTodosQuery }
