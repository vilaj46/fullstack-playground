"use client"

import { useState } from "react"

import AuthenticatedSidebar from "@/lib/modules/auth/components/AuthenticatedSidebar"
import Todos from "@/app/csr/todos/page"

export const MODULES = {
  DASHBOARD: "DASHBOARD",
  PERSON: "PERSON",
  TODO: "TODO",
} as const

export type TModule = (typeof MODULES)[keyof typeof MODULES]

const AdminDashboard = () => {
  const [module, setModule] = useState<TModule>(MODULES.DASHBOARD)

  const handleModuleSelect = (module: TModule) => setModule(module)

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
