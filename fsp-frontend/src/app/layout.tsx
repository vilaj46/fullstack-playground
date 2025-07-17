import type { ReactNode } from "react"

import type { ContentMap } from "@/shared/types"

import metadata from "@/lib/config/metadata/default"

import routes from "@/lib/constants"

import ContentProviderWrapper from "@/lib/providers/ContentProviderWrapper"

import AnalyticsScript from "@/lib/components/AnalyticsScript"
import TopNavigation from "@/lib/components/TopNavigation"

import "@/app/globals.css"

import { getRequest } from "@/lib/utils/http-utils"

type Props = {
  children: ReactNode
}

export { metadata }

// TODO: Move into config file
const topNavigationRoutes = [routes.HOME, routes.MODULE]

const RootLayout = async ({ children }: Props) => {
  const initialContent = await getRequest<ContentMap>("/static/test.json")

  return (
    <html lang="en">
      <head>
        <AnalyticsScript />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* <TopNavigation routes={topNavigationRoutes} /> */}
        <ContentProviderWrapper initialContent={initialContent}>
          {children}
        </ContentProviderWrapper>
      </body>
    </html>
  )
}

export default RootLayout
