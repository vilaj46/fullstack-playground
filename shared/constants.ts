const statusCodes = [
  200, 201, 204, 400, 401, 403, 404, 409, 422, 500, 502, 503,
] as const

const todoSorting = {
  ID_ASC: "id_asc",
  ID_DESC: "id_desc",
  ALPHA_ASC: "alpha_asc",
  ALPHA_DESC: "alpha_desc",
  COMPLETED_ASC: "completed_asc",
  COMPLETED_DESC: "completed_desc",
  NONE: "none",
} as const

export { statusCodes, todoSorting }
