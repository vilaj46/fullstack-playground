"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { ContentMap } from "@/shared/types"

// Accept initialContent as a prop
interface Props {
  children: ReactNode
  initialContent: ContentMap
}

type TContentContext = ContentMap

const ContentContext = createContext<TContentContext>({} as TContentContext)

const ContentProvider = (props: Props) => {
  return (
    <ContentContext.Provider value={props.initialContent}>
      {props.children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}

export default ContentProvider
