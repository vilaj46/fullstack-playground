import type { TApiErrors } from "@/lib/types"

class ApiError<Errors> extends Error {
  others?: Omit<TApiErrors<Errors>, "message">

  constructor(errors: TApiErrors<Errors>) {
    const { message, ...rest } = errors
    super(message)
    this.others = { ...rest }
  }
}

export default ApiError
