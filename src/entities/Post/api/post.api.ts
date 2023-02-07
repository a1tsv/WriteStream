import { IPost } from '@entities/Post/api/post.interface'
import { api } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'

export const postApi = api.injectEndpoints({
	endpoints: build => ({
		getPosts: build.query<
			IGetItemsResponse<IPost[]>,
			{ model: Partial<IGetItemsModel>; blogId?: string }
		>({
			query: data => ({
				url: data.blogId ? `/blogs/${data.blogId}/posts` : '/posts',
				method: 'GET',
				params: data.model
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
