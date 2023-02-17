export {
	postAdminAPI,
	useCreatePostMutation,
	useDeletePostMutation,
	useUpdatePostMutation
} from './admin/post.api'
export {
	postUserApi,
	useGetPostQuery,
	useGetPostsQuery,
	useGetCommentsQuery
} from './user'
export { type IPost, type IUpdatePostModel } from './post.interface'
