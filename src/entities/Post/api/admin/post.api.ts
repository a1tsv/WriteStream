import { IPost, IUpdatePostModel } from '@entities/Post/api/post.interface'
import { adminAPI } from '@shared/api'

export const postAdminAPI = adminAPI.injectEndpoints({
	endpoints: build => ({
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
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation
} = postAdminAPI
