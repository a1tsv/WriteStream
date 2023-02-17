import { IComment } from '@entities/Comment'
import { userAPI } from '@shared/api'

export const commentApi = userAPI.injectEndpoints({
	endpoints: build => ({
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
