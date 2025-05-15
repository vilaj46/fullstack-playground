import type { TApiErrors, TStatusCode } from "../types"

const captureStackTraceSafe = (error: Error, constructor: Function) => {
  if (typeof (Error as any).captureStackTrace === "function") {
    ;(Error as any).captureStackTrace(error, constructor)
  }
}

class ApiError<Errors = undefined> extends Error {
  errors?: Omit<TApiErrors<Errors>, "message">
  statusCode: TStatusCode

  constructor(statusCode: TStatusCode, errors: TApiErrors<Errors>) {
    const { message, ...rest } = errors
    super(message)

    Object.setPrototypeOf(this, ApiError.prototype)
    captureStackTraceSafe(this, ApiError)

    this.errors = Object.freeze({ ...rest })
    this.message = message
    this.name = "ApiError"
    this.statusCode = statusCode
  }

  getStatusCode() {
    return this.statusCode
  }

  override toString() {
    return `${this.name}: ${this.message}`
  }
}

export default ApiError
