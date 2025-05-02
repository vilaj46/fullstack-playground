import Link from "next/link"

import { homePageModules } from "@/lib/constants"

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900 font-mono flex flex-col items-center min-h-screen p-10">
      <h1 className="text-6xl font-bold text-gray-800 self-start">Home Page</h1>
      <div className="grid grid-cols-2 gap-6 mt-10 w-full max-w-4xl">
        {homePageModules.map((module, index) => (
          <Link
            className="p-6 border-4 border-gray-800 bg-blue-400 text-gray-900 text-2xl shadow-lg hover:bg-gray-800 hover:text-white transition-all"
            key={module.href}
            href={module.href}
          >
            Module {index + 1}: {module.label}
          </Link>
        ))}
      </div>
    </main>
  )
}
