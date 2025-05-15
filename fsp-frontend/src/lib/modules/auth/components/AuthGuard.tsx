"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import { useAuth } from "@/lib/providers/AuthProvider"

import AuthenticatedNavigation from "@/lib/modules/auth/components/AuthenticatedNavigation"

type Props = {
  children: ReactNode
}

const AuthGuard = (props: Props) => {
  const hasRefetched = useRef(false)
  const pathname = usePathname()
  const protectedRoutes = ["/csr/admin/dashboard", "/csr/todos"]
  const isProtected = protectedRoutes.includes(pathname)
  const isRedirectPage = pathname?.startsWith("/csr/admin")

  const { isAuthenticated, isLoading, refetch } = useAuth()

  // useRefetchOnPageLoad
  useEffect(() => {
    if (hasRefetched.current) {
      return
    }
    if (!isAuthenticated && (isProtected || isRedirectPage)) {
      refetch()
      hasRefetched.current = true
    }
  }, [isAuthenticated, isProtected, refetch])

  if (!isProtected) {
    return props.children
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Access Denied</div>
  }

  return (
    <>
      {/* <AuthenticatedNavigation /> */}
      {props.children}
    </>
  )
}

export default AuthGuard
