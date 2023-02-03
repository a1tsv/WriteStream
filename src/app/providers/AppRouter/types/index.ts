import { ReactNode } from 'react'

export enum RoutesEnum {
	'BLOGS' = '/blogs',
	'POSTS' = '/POSTS'
}

export interface IRoute {
	path: string
	component: ReactNode
	isPage: boolean
}
