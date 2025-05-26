import { z } from "zod"

import { todoSorting } from "@/shared/constants"

const GetTodosSchema = z.object({
  filter: z.string().default(""),
  limit: z.coerce.number().int().min(1).default(100),
  offset: z.coerce.number().int().min(0).default(0),
  paginated: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  sorting: z.nativeEnum(todoSorting).default(todoSorting.ID_ASC),
})

export { GetTodosSchema }
