export type Route = {
  label: string
  href: string
  subRoutes?: Array<Route>
}

function createRoute(
  label: Route["label"],
  href: Route["href"],
  subRoutes?: Array<Route>
) {
  return {
    href,
    label,
    subRoutes,
  }
}

export default {
  BLOG: createRoute("Blog", "/blog"),
  HOME: createRoute("Home", "/"),
  TODO: createRoute("Todo", "/todo"),
  MODULE: createRoute("Module", "/module", [
    createRoute("Blog", "/blog"),
    createRoute("Todo", "/todo"),
  ]),
}

// export const topNavigationRoutes = [baseRoutes.HOME, baseRoutes.MODULE]
