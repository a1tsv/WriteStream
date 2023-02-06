import { ReactNode } from 'react'

export enum RoutesEnum {
	'BLOGS' = '/blogs',
	'POSTS' = '/POSTS',
	'BLOG_PAGE' = '/blogs/:id'
}

export interface IRoute {
	path: string
	component: ReactNode
	title: string
	icon?: ReactNode
}
