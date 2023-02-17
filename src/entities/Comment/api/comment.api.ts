import { IComment } from '@entities/Comment'
import { api } from '@shared/api'

export const commentApi = api.injectEndpoints({
	endpoints: build => ({
		// getComments: build.query<IComment[], void>({
		// 	query: () => 'comments'
		// }),
		// createComment: build.mutation<IComment, IComment>({
		// 	query: body => ({
		// 		url: 'comments',
		// 		method: 'POST',
		// 		body
		// 	})
		// }),
		getComment: build.query<IComment, string>({
			query: id => `comments/${id}`
		}),
		updateComment: build.mutation<void, { id: string; content: string }>({
			query: body => ({
				url: `comments/${body.id}`,
				method: 'PUT',
				body
			})
		}),
		deleteComment: build.mutation<IComment, string>({
			query: id => ({
				url: `comments/${id}`,
				method: 'DELETE'
			})
		})
	})
})

export const {
	useGetCommentQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation
} = commentApi
