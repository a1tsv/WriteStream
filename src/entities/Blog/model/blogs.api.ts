import {
	IBlog,
	IBlogRequestModel,
	IBlogResponse
} from '@entities/Blog/model/blog.types'
import { api } from '@shared/api'

const blogsApi = api.injectEndpoints({
	endpoints: build => ({
		getBlogs: build.query<IBlogResponse, Partial<IBlogRequestModel>>({
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
