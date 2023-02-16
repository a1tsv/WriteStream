import { RoutesEnum } from './types'
import { useGetRoutes } from '@shared/hooks'
import { FC, PropsWithChildren } from 'react'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

export const AppRouter: FC<PropsWithChildren> = () => {
	// const { isSuccess: isAuth } = useAuthMeQuery()
	const isAuth = true
	const routes = useGetRoutes()

	return (
		<>
			<Routes>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={route.component} />
				))}
				<Route path={'/*'} element={<Navigate to={RoutesEnum.BLOGS} />} />
			</Routes>
		</>
	)
}
