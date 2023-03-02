import { routes } from "@app/providers/AppRouter/model"

export const prepareRoutes = (isAuth: boolean) => {
  const authRoutes = routes.filter(route => route.isPrivate)
  const nonAuthRoutes = routes.filter(route => !route.isPrivate)
  const routesForCurrentUser = isAuth ? authRoutes : nonAuthRoutes

  return routesForCurrentUser
}