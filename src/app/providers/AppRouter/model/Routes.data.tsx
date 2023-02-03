import { IRoute, RoutesEnum } from '../types'
import { BlogsPage } from '@pages/Blogs'

export const routes: IRoute[] = [
	{
		path: RoutesEnum.BLOGS,
		component: <BlogsPage />,
		isPage: true
	}
]
