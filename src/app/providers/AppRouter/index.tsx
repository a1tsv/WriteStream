import { routes } from './model'
import { RoutesEnum } from './types'
import { BlogsPage } from '@pages/Blogs'
import { FC, PropsWithChildren } from 'react'
import { Route, Routes } from 'react-router'

export const AppRouter: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<Routes>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={route.component} />
				))}
				<Route path={RoutesEnum.BLOGS} element={<BlogsPage />} />
			</Routes>
		</>
	)
}
