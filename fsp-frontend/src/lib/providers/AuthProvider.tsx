import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"
import { usePathname } from "next/navigation"

import { useGetMe, usePostLogout } from "@/lib/modules/auth/authHooks"

type Props = {
  children: ReactNode
}

type Value = {
  isAuthenticated: boolean
  login: () => void
}

const AuthContext = createContext<Value>({
  isAuthenticated: false,
  login: () => undefined,
})

const AuthProvider = (props: Props) => {
  const pathname = usePathname()
  const isProtectedRoute = pathname.includes("admin")

  const meQueryResult = useGetMe({
    enabled: isProtectedRoute,
  })

  const login = () => {
    if (!isProtectedRoute) {
      return
    }

    meQueryResult.refetch()
  }

  if (!isProtectedRoute) {
    return props.children
  }

  if (meQueryResult.isPending) {
    return "Loading..."
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: meQueryResult.isSuccess,
        login,
      }}
    >
      <AuthenticatedNavigation />
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthProvider = () => {
  const context = useContext(AuthContext)

  return context
}

function AuthenticatedNavigation() {
  const { isAuthenticated } = useAuthProvider()

  const logoutMutation = usePostLogout({
    onSuccess: () => window.location.reload(),
  })

  const onLogout = () => {
    if (!isAuthenticated) {
      return
    }

    logoutMutation.mutate()
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-gray-100 border-b-2 border-gray-800 shadow-md">
      <ul className="flex gap-4 px-4 py-2 text-lg font-medium text-gray-800">
        <button className="hover:cursor-pointer" onClick={onLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default AuthProvider
