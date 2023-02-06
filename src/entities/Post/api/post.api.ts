import { IPost } from '@entities/Post/api/post.interface'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'

export const postApi = api.injectEndpoints({
	endpoints: build => ({
		getPosts: build.query<IGetItemsResponse<IPost[]>, void>({
			query: () => ({
				url: '/posts',
				method: 'GET'
			})
		}),
		getPost: build.query<IPost, string>({
			query: id => ({
				url: `/posts/${id}`,
				method: 'GET'
			})
		})
	})
})

export const { useGetPostsQuery, useGetPostQuery } = postApi
