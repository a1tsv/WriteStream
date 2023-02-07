import {
	IBlog,
	IBlogCreateRequest,
	IBlogRequestModel
} from '@entities/Blog/api/blog.interface'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'

export const blogsApi = api.injectEndpoints({
	endpoints: build => ({
		getBlogs: build.query<
			IGetItemsResponse<IBlog[]>,
			Partial<IBlogRequestModel>
		>({
			query: data => ({
				url: '/blogs',
				params: data
			})
		}),
		getBlog: build.query<IBlog, string>({
			query: id => ({
				url: `/blogs/${id}`
			})
		}),
		deleteBlog: build.mutation<void, string>({
			query: id => ({
				url: `/blogs/${id}`,
				method: 'DELETE',
				body: {
					username: 'admin',
					password: 'qwerty'
				}
			})
		}),
		createBlog: build.mutation<IBlog, IBlogCreateRequest>({
			query: data => ({
				url: '/blogs',
				method: 'POST',
				body: data
			})
		}),
		updateBlog: build.mutation<IBlog, IBlogCreateRequest>({
			query: data => ({
				url: `/blogs/${data.id}`,
				method: 'PUT',
				body: data
			})
		})
	})
})

export const { useGetBlogsQuery, useGetBlogQuery, useDeleteBlogMutation } =
	blogsApi
