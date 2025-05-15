import type { TApiErrors } from "@/lib/types"

class ApiError<Errors> extends Error {
  errors?: Omit<TApiErrors<Errors>, "message">

  constructor(errors: TApiErrors<Errors>) {
    const { message, ...rest } = errors
    super(message)

    Object.setPrototypeOf(this, ApiError.prototype)
    Error.captureStackTrace?.(this, ApiError)

    this.errors = Object.freeze({ ...rest })
    this.name = "ApiError"
  }

  override toString() {
    return `${this.name}: ${this.message}`
  }
}

export default ApiError
