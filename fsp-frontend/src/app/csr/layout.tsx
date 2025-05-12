"use client"

import type { ReactNode } from "react"

import { AuthProvider, ReactQueryProvider } from "@/lib/providers"
type Props = {
  children: ReactNode
}

const CsrLayout = (props: Props) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{props.children}</AuthProvider>
    </ReactQueryProvider>
  )
}

export default CsrLayout
