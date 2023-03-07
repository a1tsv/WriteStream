import { ReactNode } from 'react'

export enum RoutesEnum {
	'BLOGS' = '/blogs',
	'POSTS' = '/posts',
	'BLOG_PAGE' = '/blogs/:id',
	'POST_PAGE' = '/posts/:id',
	'USERS_PAGE' = '/users',
	'LOGIN_PAGE' = '/login',
	'REGISTER_PAGE' = '/register',
	'EMAIL_VERIFIED' = '/email-verified'
}

export interface IRoute {
	path: string
	component: ReactNode
	title: string
	icon?: ReactNode
	isAdmin?: boolean
	isPrivate?: boolean
}
