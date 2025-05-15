"use client"

import { useState } from "react"

import AuthenticatedSidebar from "@/lib/modules/auth/components/AuthenticatedSidebar"
import Todos from "@/app/csr/todos/page"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const MODULES = {
  DASHBOARD: "DASHBOARD",
  PERSON: "PERSON",
  TODO: "TODO",
} as const

export type TModule = (typeof MODULES)[keyof typeof MODULES]

const isValidModuleKey = (key: string): key is keyof typeof MODULES =>
  key in MODULES

const AdminDashboard = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [module, setModule] = useState<TModule>(() => {
    const initialModule = searchParams.get("module")?.toUpperCase()

    if (!initialModule) {
      return MODULES.DASHBOARD
    }

    if (isValidModuleKey(initialModule)) {
      return MODULES[initialModule]
    }

    return MODULES.DASHBOARD
  })

  const handleModuleSelect = (module: TModule) => {
    setModule(module)
    const moduleParam = module.toLowerCase()
    router.push(`${pathname}?module=${moduleParam}`)
  }

  return (
    <main className="flex">
      <AuthenticatedSidebar onModuleSelect={handleModuleSelect} />
      <main className="flex-1 p-6 bg-gray-100 min-h-[calc(100vh-81px)]">
        {module === MODULES.PERSON ? (
          <div>Person</div>
        ) : module === MODULES.TODO ? (
          <Todos />
        ) : (
          <div>Dashboard</div>
        )}
      </main>
    </main>
  )
}

export default AdminDashboard
