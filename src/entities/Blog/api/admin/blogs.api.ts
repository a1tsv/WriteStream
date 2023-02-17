import {
	IBlog,
	IBlogCreateRequestModel,
	IBlogUpdateRequest
} from '@entities/Blog/api/blog.interface'
import { adminAPI } from '@shared/api'

export const blogsAdminApi = adminAPI.injectEndpoints({
	endpoints: build => ({
		deleteBlog: build.mutation<void, string>({
			query: id => ({
				url: `/blogs/${id}`,
				method: 'DELETE',
				body: {
					username: 'admin',
					password: 'qwerty'
				}
			}),
			invalidatesTags: ['Blogs', 'Blog']
		}),
		createBlog: build.mutation<IBlog, IBlogCreateRequestModel>({
			query: data => ({
				url: '/blogs',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Blogs']
		}),
		updateBlog: build.mutation<IBlog, IBlogUpdateRequest>({
			query: data => ({
				url: `/blogs/${data.id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Blogs', 'Blog']
		})
	})
})

export const {
	useDeleteBlogMutation,
	useCreateBlogMutation,
	useUpdateBlogMutation
} = blogsAdminApi
