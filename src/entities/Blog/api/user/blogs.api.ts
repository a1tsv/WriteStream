import { IBlog, IBlogRequestModel } from '@entities/Blog/api/blog.interface'
import { userAPI } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'

export const blogsUserApi = userAPI.injectEndpoints({
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
		})
	})
})

export const { useGetBlogsQuery, useGetBlogQuery } = blogsUserApi
