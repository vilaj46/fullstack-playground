import Link from "next/link"

import type { Route } from "@/lib/constants"

type Props = {
  routes: Array<Route>
}

export default function TopNavigation(props: Props) {
  return (
    <nav className="border-b-4 border-gray-800 bg-blue-400 p-2 shadow-xl text-gray-900">
      <ul className="flex font-bold gap-4 text-xl">
        {props.routes.map((route) => (
          <li key={route.href} className="flex relative group">
            <Link
              className="border-4 border-gray-800 bg-gray-100 px-6 py-3 rounded-lg shadow-md transition-all hover:bg-gray-700 hover:text-gray-100"
              href={route.href}
            >
              {route.label}
            </Link>
            {route.subRoutes && (
              <ul className="absolute border-4 border-gray-800 bg-gray-100 hidden left-0 mt-13 shadow-lg w-48 group-hover:block">
                {route.subRoutes.map((subRoute) => (
                  <li key={subRoute.href}>
                    <Link
                      className="block px-4 py-2 text-gray-900 transition-all hover:bg-gray-700 hover:text-gray-100"
                      href={subRoute.href}
                    >
                      {subRoute.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
