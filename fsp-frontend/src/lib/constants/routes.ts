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

const routeObj = {
  BLOG: createRoute("Blog", "/blog"),
  HOME: createRoute("Home", "/"),
  TODO: createRoute("Todo", "/csr/todos"),
  MODULE: createRoute("Module", "/module", [
    createRoute("Blog", "/blog"),
    // createRoute("Todo", "/csr/todos"),
  ]),
}

export default routeObj
