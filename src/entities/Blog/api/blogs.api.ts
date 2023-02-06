import { IBlog, IBlogRequestModel } from '@entities/Blog/api/blog.interface'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'

const blogsApi = api.injectEndpoints({
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
		})
	})
})

export const { useGetBlogsQuery, useGetBlogQuery } = blogsApi
