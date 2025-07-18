"use client"

import { useState } from "react"

import AuthenticatedSidebar from "@/lib/modules/auth/components/AuthenticatedSidebar"
import Todos from "@/app/csr/todos/page"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { MODULES } from "@/app/csr/admin/dashboard/constants"
import type { TModule } from "@/app/csr/admin/dashboard/constants"
import { PostList } from "@/lib/modules/post/postComponents"

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

  function isValidModuleKey(key: string): key is keyof typeof MODULES {
    return key in MODULES
  }

  return (
    <main className="flex">
      <AuthenticatedSidebar onModuleSelect={handleModuleSelect} />
      <main className="flex-1 p-6 bg-gray-100 min-h-[calc(100vh-81px)]">
        {module === MODULES.PERSON ? (
          <div>Person</div>
        ) : module === MODULES.TODO ? (
          <Todos />
        ) : module === MODULES.POST ? (
          <PostList />
        ) : (
          <div>Dashboard</div>
        )}
      </main>
    </main>
  )
}

export default AdminDashboard
