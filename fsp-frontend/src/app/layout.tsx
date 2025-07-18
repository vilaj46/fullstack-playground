import type { ReactNode } from "react"

import metadata from "@/lib/config/metadata/default"

// import routes from "@/lib/constants"

import ContentProviderWrapper from "@/lib/providers/ContentProviderWrapper"

import AnalyticsScript from "@/lib/components/AnalyticsScript"

import "@/app/globals.css"

type Props = {
  children: ReactNode
}

export { metadata }

// TODO: Move into config file
// const topNavigationRoutes = [routes.HOME, routes.MODULE]

const RootLayout = async ({ children }: Props) => {
  try {
    const response = await fetch("http://localhost:3000/content.json")
    const initialContent = await response.json()

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
  } catch {
    return (
      <html lang="en">
        <body>Error</body>
      </html>
    )
  }
}

export default RootLayout
