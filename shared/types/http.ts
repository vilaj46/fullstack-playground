import { statusCodes } from "../constants"

type TLimitAndOffset = {
  limit: number
  offset: number
}

type TStatusCode = (typeof statusCodes)[number]

export type { TLimitAndOffset, TStatusCode }
