export const MODULES = {
  DASHBOARD: "DASHBOARD",
  PERSON: "PERSON",
  TODO: "TODO",
} as const

export type TModule = (typeof MODULES)[keyof typeof MODULES]
