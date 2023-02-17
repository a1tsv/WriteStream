import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItemFromLC } from '@shared/utils/localStorage'

const bearerToken = getItemFromLC('accessToken')
	? (getItemFromLC('accessToken') as string)
	: ''

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://ht-02-03.vercel.app/api',
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	}),
	tagTypes: ['Posts', 'Blogs', 'Blog', 'Post', 'Comments'],
	endpoints: build => ({})
})
