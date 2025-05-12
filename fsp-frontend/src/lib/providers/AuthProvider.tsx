import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

type Props = {
  children: ReactNode
}

type Value = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<Value>({
  isAuthenticated: false,
  login: () => undefined,
  logout: () => undefined,
})

const AuthProvider = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => setIsAuthenticated(true)

  const logout = () => setIsAuthenticated(false)

  const value = {
    isAuthenticated,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}

export const useAuthProvider = () => {
  const context = useContext(AuthContext)

  return context
}

export default AuthProvider
