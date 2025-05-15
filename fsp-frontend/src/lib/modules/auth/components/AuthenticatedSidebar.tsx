import type { TModule } from "@/app/csr/admin/dashboard/page"

import { MODULES } from "@/app/csr/admin/dashboard/page"
import { usePostLogout } from "@/lib/modules/auth/authHooks"
import { useAuth } from "@/lib/providers/AuthProvider"
import { useRouter } from "next/navigation"

type Props = {
  onModuleSelect: (module: TModule) => void
}

const AuthenticatedSidebar = (props: Props) => {
  const router = useRouter()
  const { refetch } = useAuth()

  const logoutMutation = usePostLogout({
    onSuccess: () => {
      refetch()
      router.push("/csr/admin")
    },
  })

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <nav className="flex flex-col h-full space-y-4">
        <div className="flex flex-col flex-grow space-y-4">
          <button
            className="inline text-left hover:cursor-pointer hover:text-gray-300"
            onClick={() => props.onModuleSelect(MODULES.DASHBOARD)}
          >
            Dashboard
          </button>
          <button
            className="inline text-left hover:cursor-pointer hover:text-gray-300"
            onClick={() => props.onModuleSelect(MODULES.PERSON)}
          >
            Person
          </button>
          <button
            className="inline text-left hover:cursor-pointer hover:text-gray-300"
            onClick={() => props.onModuleSelect(MODULES.TODO)}
          >
            Todo
          </button>
        </div>
        <button
          className="inline text-left hover:cursor-pointer hover:text-gray-300"
          onClick={() => logoutMutation.mutate()}
        >
          Logout
        </button>
      </nav>
    </aside>
  )
}

export default AuthenticatedSidebar
