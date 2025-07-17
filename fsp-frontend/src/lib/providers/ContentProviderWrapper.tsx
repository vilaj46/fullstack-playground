"use client"
import { ContentProvider } from "@/lib/providers"
import type { ContentMap } from "@/shared/types"
import type { ReactNode } from "react"

interface Props {
  initialContent: ContentMap
  children: ReactNode
}

const ContentProviderWrapper = ({ initialContent, children }: Props) => (
  <ContentProvider initialContent={initialContent}>{children}</ContentProvider>
)

export default ContentProviderWrapper
