import { publicRoutes, routes } from '@app/providers/AppRouter/model'
import { useAuthMeQuery } from '@entities/User'
import { getBearerToken } from '@shared/utils/getBearerToken'

export const useGetRoutes = () => {
	const { isSuccess: isAuth } = useAuthMeQuery()
	console.log('getting new routes');


	const authRoutes = routes.filter(route => route.isPrivate)
	const nonAuthRoutes = routes.filter(route => !route.isPrivate)
	const routesForCurrentUser = isAuth ? authRoutes : nonAuthRoutes

	return [...routesForCurrentUser, ...publicRoutes]
}
