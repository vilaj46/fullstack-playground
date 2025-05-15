type TLimitAndOffset = {
  limit?: string
  offset?: string
}

const getLimitAndOffset = (
  query?: TLimitAndOffset
):
  | {
      limit: number
      offset: number
    }
  | undefined => {
  if (!query) {
    return
  }

  const hasLimit = "limit" in query
  const hasOffset = "offset" in query

  if (!hasLimit || !hasOffset) {
    return
  }

  const limit = parseInt(query.limit ?? "0") ?? 0
  const offset = parseInt(query.offset ?? "0") ?? 0

  return {
    limit,
    offset,
  }
}

export { getLimitAndOffset }
