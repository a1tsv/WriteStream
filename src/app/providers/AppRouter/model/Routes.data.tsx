import { IRoute, RoutesEnum } from '../types'
import { BlogPage } from '@pages/Blog'
import { BlogsPage } from '@pages/Blogs'
import { PostPage } from '@pages/Post'
import { PostsPage } from '@pages/Posts'
import { UsersPage } from '@pages/Users'
import { FiUsers } from 'react-icons/fi'
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
	},
	{
		path: RoutesEnum.POST_PAGE,
		title: 'Post Page',
		component: <PostPage />
	},
	{
		path: RoutesEnum.USERS_PAGE,
		title: 'Users',
		icon: <FiUsers />,
		component: <UsersPage />
	}
]
