"use client"

import type { ReactNode } from "react"

import { AuthProvider, ReactQueryProvider } from "@/lib/providers"
import AuthGuard from "@/lib/modules/auth/components/AuthGuard"

type Props = {
  children: ReactNode
}

const CsrLayout = (props: Props) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <AuthGuard>{props.children}</AuthGuard>
      </AuthProvider>
    </ReactQueryProvider>
  )
}

export default CsrLayout
