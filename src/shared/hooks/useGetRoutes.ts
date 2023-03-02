import { publicRoutes, routes } from '@app/providers/AppRouter/model'
import { useAuthMeQuery } from '@entities/User'
import { getBearerToken } from '@shared/utils/getBearerToken'
import { prepareRoutes } from '@shared/utils/prepareRoutes'

export const useGetRoutes = () => {
	const { isSuccess: isAuth } = useAuthMeQuery()
	console.log('getting new routes');



	return [...prepareRoutes(isAuth), ...publicRoutes]
}
