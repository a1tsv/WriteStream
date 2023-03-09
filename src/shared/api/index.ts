import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@shared/api/baseQuery'

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
		'Auth',
		'Devices'
	],
	endpoints: build => ({})
})
