export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL?: string
      NEXT_PUBLIC_BACKEND_BASE_URL?: string
      NEXT_PUBLIC_NODE_ENV?: "development" | "production"
    }
  }
}
