"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { redirect } from "next/navigation"

import { usePostLogin, useSignup } from "@/lib/modules/auth/authHooks"

import { useAuth } from "@/lib/providers/AuthProvider"
import { useContent } from "@/lib/providers/ContentProvider"

const Admin = () => {
  const _ = useContent()
  const { isAuthenticated, handleLogin } = useAuth()

  const [form, setForm] = useState({
    password: "",
    username: "",
  })
  const [isNewUser, setIsNewUser] = useState(false)

  const loginMutation = usePostLogin({
    onSuccess: () => handleLogin(),
  })

  const signupMutation = useSignup({
    onSuccess: () => handleLogin(),
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const formUsername = formData.get("username")?.toString() ?? ""
    const formPassword = formData.get("password")?.toString() ?? ""

    const hasUsername = !!form.username.length || !!formUsername.length
    const hasPassword = !!form.password.length || !!formPassword.length

    if (!hasUsername || !hasPassword) {
      return
    }

    if (isNewUser) {
      signupMutation.mutate({
        password: form.password.length > 0 ? form.password : formPassword,
        username: form.username.length > 0 ? form.username : formUsername,
      })
    } else {
      loginMutation.mutate({
        password: form.password.length > 0 ? form.password : formPassword,
        username: form.username.length > 0 ? form.username : formUsername,
      })
    }
  }

  if (isAuthenticated) {
    redirect("/csr/admin/dashboard")
  }

  const actionText = isNewUser ? "Signup" : _.Login

  return (
    <main className="bg-blue-400 flex flex-grow items-center justify-center">
      <form
        className="border-4 border-gray-800 bg-gray-100 p-6 rounded-lg shadow-xl text-gray-900 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold mb-4 text-center text-xl">{actionText}</h2>
        <div className="mb-4">
          <label className="block font-bold" htmlFor="username">
            Username:
          </label>
          <input
            className="bg-gray-100 border border-gray-800 px-4 py-2 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
            id="username"
            name="username"
            onChange={handleChange}
            value={form.username}
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
            value={form.password}
            type="password"
          />
        </div>
        <button
          className="bg-gray-700 cursor-pointer font-bold px-4 py-3 rounded-lg shadow-md text-gray-100 transition-all w-full hover:bg-gray-900"
          type="submit"
        >
          {actionText}
        </button>
        <p className="mt-4 text-center text-sm text-gray-700">
          {isNewUser ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsNewUser(false)}
                className="font-semibold text-blue-700 hover:cursor-pointer hover:underline"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsNewUser(true)}
                className="font-semibold text-blue-700 hover:cursor-pointer hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </form>
    </main>
  )
}

export default Admin
