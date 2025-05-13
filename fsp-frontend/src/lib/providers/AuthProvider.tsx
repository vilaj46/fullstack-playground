import type { ReactNode } from "react"
import { createContext, useContext } from "react"

import { useGetPerson } from "@/lib/modules/auth/authHooks"

type Props = {
  children: ReactNode
}

type TAuthContext = {
  handleLogin: () => void
  handleLogout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<TAuthContext | undefined>(undefined)

const AuthProvider = (props: Props) => {
  const { isLoading, isPending, isSuccess, refetch } = useGetPerson({
    enabled: false,
  })

  const handleLogin = () => refetch()

  const handleLogout = () => undefined

  const value = {
    handleLogin,
    handleLogout,
    isAuthenticated: isSuccess,
    isLoading: isLoading || isPending,
    refetch,
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

export default AuthProvider
