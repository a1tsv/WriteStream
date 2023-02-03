import { routes } from './model'
import { RoutesEnum } from './types'
import { FC, PropsWithChildren } from 'react'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

export const AppRouter: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<Routes>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={route.component} />
				))}
				<Route path={'/*'} element={<Navigate to={RoutesEnum.BLOGS} />} />
			</Routes>
		</>
	)
}
