import { IRoute, RoutesEnum } from '../types'
import { BlogPage } from '@pages/Blog'
import { BlogsPage } from '@pages/Blogs'
import { PostsPage } from '@pages/Posts'
import { MdOutlineTableRows } from 'react-icons/md'
import { RxRows } from 'react-icons/rx'

export const routes: IRoute[] = [
	{
		path: RoutesEnum.BLOGS,
		title: 'Blogs',
		component: <BlogsPage />,
		icon: <RxRows />
	},
	{
		path: RoutesEnum.POSTS,
		title: 'Posts',
		component: <PostsPage />,
		icon: <MdOutlineTableRows />
	},
	{
		path: RoutesEnum.BLOG_PAGE,
		title: 'Blog Page',
		component: <BlogPage />
	}
]
