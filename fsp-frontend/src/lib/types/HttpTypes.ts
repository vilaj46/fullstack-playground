type TApiErrors<ExpectedErrors = undefined> = {
  message: string
} & (ExpectedErrors extends undefined
  ? Record<string, unknown>
  : Record<string, string>)

export type { TApiErrors }
