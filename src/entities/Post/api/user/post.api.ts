import { IComment } from '@entities/Comment'
import { IPost } from '@entities/Post/api/post.interface'
import { userAPI } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'

export const postUserApi = userAPI.injectEndpoints({
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
		createComment: build.mutation<IComment, { id: string; content: string }>({
			query: data => ({
				url: `/posts/${data.id}/comments`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Comments']
		}),
		getComments: build.query<IGetItemsResponse<IComment[]>, string>({
			query: id => ({
				url: `/posts/${id}/comments`
			}),
			providesTags: ['Comments']
		})
	})
})

export const { useGetPostsQuery, useGetPostQuery, useGetCommentsQuery } =
	postUserApi
