import {
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
		})
	})
})

export const { useGetBlogsQuery } = blogsApi
