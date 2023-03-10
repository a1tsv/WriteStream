import { IRoute, RoutesEnum } from '../types'
import { Register } from '@features/Register'
import { BlogPage } from '@pages/Blog'
import { BlogsPage } from '@pages/Blogs'
import { ConfgirmRegistration } from '@pages/ConfirmRegistration'
import { EmailVerified } from '@pages/EmailVerified'
import { ForgotPassword } from '@pages/ForgotPassword'
import { LoginPage } from '@pages/Login'
import { PostPage } from '@pages/Post'
import { PostsPage } from '@pages/Posts'
import { ProfilePage } from '@pages/Profile'
import { ResendEmail } from '@pages/ResendEmail'
import { UsersPage } from '@pages/Users'
import { BiUserPlus } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
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
		path: RoutesEnum.PROFILE,
		title: 'Profile',
		icon: <CgProfile />,
		component: <ProfilePage />,
		isPrivate: true
	},
	{
		path: RoutesEnum.LOGIN_PAGE,
		title: 'Login',
		icon: <FiLogIn />,
		component: <LoginPage />
	},
	{
		path: RoutesEnum.REGISTER_PAGE,
		title: 'Register',
		icon: <BiUserPlus />,
		component: <Register />
	},
	{
		path: RoutesEnum.EMAIL_VERIFIED,
		title: 'Email verified',
		component: <EmailVerified />
	},
	{
		path: RoutesEnum.RESEND_EMAIL,
		title: 'Resend email',
		component: <ResendEmail />
	},
	{
		path: RoutesEnum.CONFIRM_REGISTRATION,
		title: 'Confirm registration',
		component: <ConfgirmRegistration />
	},
	{
		path: RoutesEnum.PASSWORD_RECOVERY,
		title: 'Password recovery',
		component: <ForgotPassword />
	}
]
