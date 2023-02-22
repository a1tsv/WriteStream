import { publicRoutes, routes } from '@app/providers/AppRouter/model'
import { useAuthMeQuery } from '@entities/User'
import { getItemFromLC } from '@shared/utils/localStorage'

export const useGetRoutes = () => {
	const accessToken = getItemFromLC('accessToken') as string
	const { isSuccess: isAuth } = useAuthMeQuery(accessToken)
	// const isAuth = false

	const authRoutes = routes.filter(route => route.isPrivate)
	const nonAuthRoutes = routes.filter(route => !route.isPrivate)
	const routesForCurrentUser = isAuth ? authRoutes : nonAuthRoutes
	const routesToRender = [...routesForCurrentUser, ...publicRoutes]

	return routesToRender
}
