import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminAPI = createApi({
	reducerPath: 'adminAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://ht-02-03.vercel.app/api',
		headers: {
			Authorization: 'Basic YWRtaW46cXdlcnR5'
		}
	}),
	tagTypes: ['Posts', 'Blogs', 'Blog', 'Post', 'Users', 'User', 'Comments'],
	endpoints: build => ({})
})
