"use client"

import type { ReactNode } from "react"

import { AuthProvider, ReactQueryProvider } from "@/lib/providers"
import { useAuthProvider } from "@/lib/providers/AuthProvider"

type Props = {
  children: ReactNode
}

const CsrLayout = (props: Props) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <>
          <AuthenciatedNavigation />
          {props.children}
        </>
      </AuthProvider>
    </ReactQueryProvider>
  )
}

function AuthenciatedNavigation() {
  const { isAuthenticated } = useAuthProvider()

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-gray-100 border-b-2 border-gray-800 shadow-md">
      <ul className="flex gap-4 px-4 py-2 text-lg font-medium text-gray-800">
        <button>Logout</button>
      </ul>
    </nav>
  )
}

export default CsrLayout
