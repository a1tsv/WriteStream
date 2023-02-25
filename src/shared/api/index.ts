import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '@shared/api/baseQuery'

// export const api = createApi({
// 	reducerPath: 'api',
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: 'https://ht-02-03.vercel.app/api',
// 		headers: { Authorization: getBearerToken() },
// 		credentials: 'include'
// 	}),
// 	tagTypes: [
// 		'Posts',
// 		'Blogs',
// 		'Blog',
// 		'Post',
// 		'Users',
// 		'User',
// 		'Comments',
// 		'Auth'
// 	],
// 	endpoints: build => ({})
// })

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
