import { IRatePayload } from '../model'
import { IComment } from '@entities/Comment'
import { api } from '@shared/api'

export const commentApi = api.injectEndpoints({
	endpoints: build => ({
		getComment: build.query<IComment, string>({
			query: id => `comments/${id}`
		}),
		updateComment: build.mutation<void, { id: string; content: string }>({
			query: body => ({
				url: `comments/${body.id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['Comments']
		}),
		deleteComment: build.mutation<IComment, string>({
			query: id => ({
				url: `comments/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Comments']
		}),
		rateComment: build.mutation<IComment, IRatePayload>({
			query: ({ id, likeStatus }) => ({
				url: `comments/${id}/like-status`,
				method: 'PUT',
				body: { likeStatus }
			}),
			invalidatesTags: ['Comments']
		})
	})
})

export const {
	useGetCommentQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
	useRateCommentMutation
} = commentApi
