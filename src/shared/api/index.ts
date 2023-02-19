import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItemFromLC } from '@shared/utils/localStorage'

const accessToken = getItemFromLC('accessToken') as string
const bearerToken = accessToken ? `Bearer ${accessToken}` : ''

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://ht-02-03.vercel.app/api',
		headers: {
			Authorization: bearerToken
		}
	}),
	tagTypes: [
		'Posts',
		'Blogs',
		'Blog',
		'Post',
		'Users',
		'User',
		'Comments',
		'Auth'
	],
	endpoints: build => ({})
})
