import { publicRoutes } from '@app/providers/AppRouter/model'
import { useAuthMeQuery } from '@entities/User'
import { prepareRoutes } from '@shared/utils/prepareRoutes'

export const useGetRoutes = () => {
	const { isSuccess: isAuth } = useAuthMeQuery()

	return [...prepareRoutes(isAuth), ...publicRoutes]
}
