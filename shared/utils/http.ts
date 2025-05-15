import { TStatusCode } from "../types"

import { statusCodes } from "../constants"

const isValidStatusCode = (statusCode: number): statusCode is TStatusCode =>
  statusCodes.includes(statusCode as TStatusCode)

export { isValidStatusCode }
