import { useRouter } from "next/navigation"

import { useAuth } from "@/lib/providers/AuthProvider"
import { usePostLogout } from "@/lib/modules/auth/authHooks"

function AuthenticatedNavigation() {
  const router = useRouter()
  const { isAuthenticated, refetch } = useAuth()

  const logoutMutation = usePostLogout({
    onSuccess: () => {
      refetch()
      router.push("/csr/admin")
    },
  })

  const onLogout = () => {
    if (!isAuthenticated) {
      return
    }

    logoutMutation.mutate()
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-gray-100 border-b-2 border-gray-800 shadow-md">
      <ul className="flex gap-4 px-4 py-2 text-lg font-medium text-gray-800">
        <button className="hover:cursor-pointer" onClick={onLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default AuthenticatedNavigation
