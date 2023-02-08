import { IPost, IUpdatePostModel } from '@entities/Post/api/post.interface'
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
			}),
			providesTags: ['Posts']
		}),
		getPost: build.query<IPost, string>({
			query: id => ({
				url: `/posts/${id}`,
				method: 'GET'
			})
		}),
		createPost: build.mutation<IPost, Partial<IPost>>({
			query: data => ({
				url: '/posts',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Posts']
		}),
		updatePost: build.mutation<IPost, IUpdatePostModel>({
			query: data => ({
				url: `/posts/${data.id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Posts']
		}),
		deletePost: build.mutation<IPost, string>({
			query: id => ({
				url: `/posts/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Posts']
		})
	})
})

export const {
	useGetPostsQuery,
	useGetPostQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation
} = postApi
