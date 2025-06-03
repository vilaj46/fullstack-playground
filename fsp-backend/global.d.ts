import { TNodeEnv } from "@/shared/types"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_BASE_URL?: string
      FRONTEND_LOCAL_URL?: string
      NODE_ENV?: TNodeEnv
      PORT?: number
      POSTGRES_CONTAINER?: string
      POSTGRES_DB?: string
      POSTGRES_PASSWORD?: string
      POSTGRES_PORT?: number
      POSTGRES_USERNAME?: string
      POSTGRES_TEST_DB?: string
      SECRET_KEY?: string
      POSTGRES_URL?: string
      RESET_DB?: string
      REDIS_DEV_URL?: string
      REDIS_PROD_USERNAME?: string
      REDIS_PROD_PASSWORD?: string
      REDIS_PROD_SOCKET_HOST?: string
      REDIS_PROD_SOCKET_PORT?: number
    }
  }
  namespace Express {
    interface Request {
      validatedQuery?: any
    }
  }
}

export {}
