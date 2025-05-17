import type { TStatusCode } from "../types"

import { statusCodes } from "../constants"

const generateQueryParams = (
  params: Record<string, boolean | number | string>
) => {
  const markedForRemoval: Array<unknown> = ["", undefined]

  let query = ""

  for (const [key, value] of Object.entries(params)) {
    if (markedForRemoval.includes(value)) {
      continue
    }

    if (query.length === 0) {
      query = `${key}=${value}&`
    } else {
      query = query + `${key}=${value}&`
    }
  }

  if (query.lastIndexOf("&") === query.length - 1) {
    query = query.slice(0, query.length - 1)
  }

  return query
}

const isValidStatusCode = (statusCode: number): statusCode is TStatusCode =>
  statusCodes.includes(statusCode as TStatusCode)

export { generateQueryParams, isValidStatusCode }
