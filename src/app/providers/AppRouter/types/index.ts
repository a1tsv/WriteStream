import { ReactNode } from 'react'

export enum RoutesEnum {
	'BLOGS' = '/blogs',
	'POSTS' = '/posts',
	'BLOG_PAGE' = '/blogs/:id',
	'POST_PAGE' = '/posts/:id'
}

export interface IRoute {
	path: string
	component: ReactNode
	title: string
	icon?: ReactNode
}
