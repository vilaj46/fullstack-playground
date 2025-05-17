import type { TLimitAndOffset } from "../types/http"
import { parseIntWithUndefined } from "../utils"

type TQueryParameters = Record<string, boolean | number | string | undefined>

function QueryParameters<T extends TQueryParameters>(params?: T) {
  const queryParameters = Object.freeze(params)

  if (!queryParameters) {
    return
  }

  // toString
  // createUrlQueryParameter
  const getLimitAndOffset = (): TLimitAndOffset | undefined => {
    const hasLimit = "limit" in queryParameters
    const hasOffset = "offset" in queryParameters

    if (!hasLimit || hasOffset) {
      return
    }

    const limit = parseIntWithUndefined(queryParameters.limit?.toString())
    const offset = parseIntWithUndefined(queryParameters.offset?.toString())

    return {
      limit,
      offset,
    }
  }

  const getQueryParams = () => queryParameters

  return {
    getLimitAndOffset,
    getQueryParams,
  }
}

export default QueryParameters
