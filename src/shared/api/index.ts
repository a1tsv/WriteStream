import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@shared/api/baseQuery'
import { getBearerToken } from '@shared/utils/getBearerToken'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReAuth,
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

