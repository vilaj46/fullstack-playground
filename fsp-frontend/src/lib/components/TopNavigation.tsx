import Link from "next/link"

import { Route } from "@/lib/constants"

type Props = {
  routes: Array<Route>
}

export default function TopNavigation(props: Props) {
  return (
    <nav className="w-full bg-blue-400 text-gray-900 p-4 shadow-xl border-b-4 border-gray-800">
      <ul className="flex justify-between max-w-6xl mx-auto text-xl font-bold">
        {props.routes.map((route) => (
          <li key={route.href} className="relative group">
            <Link
              className="px-6 py-3 bg-gray-100 text-gray-900 border-4 border-gray-800 rounded-lg hover:bg-gray-700 hover:text-gray-100 transition-all shadow-md"
              href={route.href}
            >
              {route.label}
            </Link>
            {route.subRoutes && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-100 border-4 border-gray-800 shadow-lg hidden group-hover:block">
                {route.subRoutes.map((subRoute) => (
                  <li key={subRoute.href}>
                    <Link
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-700 hover:text-gray-100 transition-all"
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
