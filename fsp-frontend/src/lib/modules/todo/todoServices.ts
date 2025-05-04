import type { TTodo } from "@/shared/types"

import { getRequest } from "@/lib/utils/http-utils"

const getAllTodos = async () => await getRequest<Array<TTodo>>("/todos")

export { getAllTodos }
