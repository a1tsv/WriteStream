import { IRoute, RoutesEnum } from '../types'
import { BlogPage } from '@pages/Blog'
import { BlogsPage } from '@pages/Blogs'
import { LoginPage } from '@pages/Login'
import { PostPage } from '@pages/Post'
import { PostsPage } from '@pages/Posts'
import { UsersPage } from '@pages/Users'
import { FiLogIn, FiUsers } from 'react-icons/fi'
import { MdOutlineTableRows } from 'react-icons/md'
import { RxRows } from 'react-icons/rx'

export const publicRoutes: IRoute[] = [
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
	}
]

export const routes: IRoute[] = [
	{
		path: RoutesEnum.USERS_PAGE,
		title: 'Users',
		icon: <FiUsers />,
		component: <UsersPage />,
		isPrivate: true,
		isAdmin: true
	},
	{
		path: RoutesEnum.LOGIN_PAGE,
		title: 'Login',
		icon: <FiLogIn />,
		component: <LoginPage />
	}
]
