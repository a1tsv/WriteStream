import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://ht-02-03.vercel.app/api',
		headers: {
			Authorization: 'Basic YWRtaW46cXdlcnR5'
		}
	}),
	tagTypes: ['Posts', 'Blogs', 'Blog', 'Post', 'User'],
	endpoints: build => ({})
})
