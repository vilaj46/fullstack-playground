import Link from "next/link"

import routes from "@/lib/constants"

const Home = () => {
  const homePageModules = [routes.BLOG, routes.TODO]

  return (
    <main className="bg-gray-100 flex flex-col font-mono items-center min-h-screen p-10 text-gray-900">
      <h1 className="font-bold self-start text-6xl text-gray-800">Home Page</h1>
      <div className="gap-6 grid grid-cols-2 max-w-4xl mt-10 w-full">
        {homePageModules.map((module, index) => (
          <Link
            className="bg-blue-400 border-4 border-gray-800 p-6 shadow-lg text-2xl text-gray-900 transition-all hover:bg-gray-800 hover:text-white"
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

export default Home
