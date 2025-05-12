"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"

import { usePostLogin } from "@/lib/modules/auth/authHooks"

import { useAuthProvider } from "@/lib/providers/AuthProvider"

const Admin = () => {
  const { isAuthenticated, login } = useAuthProvider()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const loginMutation = usePostLogin({
    onSuccess: () => login(),
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setUsername(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const formUsername = formData.get("username")?.toString() ?? ""
    const formPassword = formData.get("password")?.toString() ?? ""

    const hasUsername = !!username.length || !!formUsername.length
    const hasPassword = !!password.length || !!formPassword.length

    if (!hasUsername || !hasPassword) {
      return
    }

    loginMutation.mutate({
      password: password.length > 0 ? password : formPassword,
      username: username.length > 0 ? username : formUsername,
    })
  }

  if (isAuthenticated) {
    return (
      <main>
        <h2 className="font-bold mb-4 text-center text-xl">Admin page</h2>
      </main>
    )
  }

  return (
    <main className="bg-blue-400 flex flex-grow items-center justify-center">
      <form
        className="border-4 border-gray-800 bg-gray-100 p-6 rounded-lg shadow-xl text-gray-900 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold mb-4 text-center text-xl">Login</h2>
        <div className="mb-4">
          <label className="block font-bold" htmlFor="username">
            Username:
          </label>
          <input
            className="bg-gray-100 border border-gray-800 px-4 py-2 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
            id="username"
            name="username"
            onChange={handleChange}
            value={username}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold" htmlFor="password">
            Password:
          </label>
          <input
            className="bg-gray-100 border border-gray-800 px-4 py-2 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
            id="password"
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
          />
        </div>
        <button
          className="bg-gray-700 cursor-pointer font-bold px-4 py-3 rounded-lg shadow-md text-gray-100 transition-all w-full hover:bg-gray-900"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  )
}

export default Admin
