export const MODULES = {
  DASHBOARD: "DASHBOARD",
  PERSON: "PERSON",
  POST: "POST",
  TODO: "TODO",
} as const

export type TModule = (typeof MODULES)[keyof typeof MODULES]
