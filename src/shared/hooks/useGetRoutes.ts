import { publicRoutes, routes } from '@app/providers/AppRouter/model'
import { useAuthMeQuery } from '@entities/User/api/user.api'

export const useGetRoutes = () => {
	const { isSuccess: isAuth } = useAuthMeQuery()
	// const isAuth = false

	const authRoutes = routes.filter(route => route.isPrivate)
	const nonAuthRoutes = routes.filter(route => !route.isPrivate)
	const routesForCurrentUser = isAuth ? authRoutes : nonAuthRoutes
	const routesToRender = [...routesForCurrentUser, ...publicRoutes]

	return routesToRender
}
