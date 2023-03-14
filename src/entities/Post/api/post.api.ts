import { IComment } from '@entities/Comment'
import {
	ICreatePostModel,
	IDeletePostModel,
	IPost,
	IUpdatePostModel
} from '@entities/Post/api/post.interface'
import { api } from '@shared/api'
import {
	IGetItemsModel,
	IGetItemsResponse,
	IRatePayload
} from '@shared/api/api.interface'

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
		createPost: build.mutation<IPost, ICreatePostModel>({
			query: data => ({
				url: `/blogger/blogs/${data.blogId}/posts`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Posts']
		}),
		updatePost: build.mutation<IPost, IUpdatePostModel>({
			query: data => ({
				url: `/blogger/blogs/${data.blogId}/posts/${data.id}`,
				method: 'PUT',
				body: {
					shortDescription: data.shortDescription,
					title: data.title,
					content: data.content
				}
			}),
			invalidatesTags: ['Posts']
		}),
		deletePost: build.mutation<IPost, IDeletePostModel>({
			query: data => ({
				url: `blogger/blogs/${data.blogId}/posts/${data.id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Posts']
		}),
		ratePost: build.mutation<string, IRatePayload>({
			query: ({ id, likeStatus }) => ({
				url: `/posts/${id}/like-status`,
				method: 'PUT',
				body: { likeStatus }
			})
		}),
		getComments: build.query<IGetItemsResponse<IComment[]>, string>({
			query: id => ({
				url: `/posts/${id}/comments`
			}),
			providesTags: ['Comments']
		}),
		createComment: build.mutation<IComment, { id: string; content: string }>({
			query: data => ({
				url: `/posts/${data.id}/comments`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Comments']
		})
	})
})

export const {
	useGetPostsQuery,
	useGetPostQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
	useRatePostMutation,
	useCreateCommentMutation,
	useGetCommentsQuery
} = postApi
