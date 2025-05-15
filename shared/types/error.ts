type TErrorMessage = Error["message"]

type TExpectedErrors<T> = T extends undefined ? Record<string, unknown> : T

// TODO: Maybe not a ApiError but an extension of error...
type TApiErrors<ExpectedErrors = undefined> = {
  message: TErrorMessage
} & TExpectedErrors<ExpectedErrors>

export type { TApiErrors }
