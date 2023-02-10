import {
	IBlog,
	IBlogCreateRequestModel,
	IBlogRequestModel,
	IBlogUpdateRequest
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
			}),
			providesTags: ['Blogs', 'Blog']
		}),
		getBlog: build.query<IBlog, string>({
			query: id => ({
				url: `/blogs/${id}`
			}),
			providesTags: ['Blog']
		}),
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
	useGetBlogsQuery,
	useGetBlogQuery,
	useDeleteBlogMutation,
	useCreateBlogMutation,
	useUpdateBlogMutation
} = blogsApi
