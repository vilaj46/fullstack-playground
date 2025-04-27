declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_BASE_URL?: string
      FRONTEND_LOCAL_URL?: string
      NODE_ENV?: "development" | "production"
    }
  }
}

export {}
