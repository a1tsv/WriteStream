import { IPost } from '@entities/Post'
import { PostsPage } from '@pages/Posts'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { useEffect } from 'react'
import { MemoryRouter, Routes } from 'react-router'
import { Route } from 'react-router-dom'

export default {
	title: 'Posts',
	component: PostsPage,
	parameters: {
		msw: [
			rest.get(`${baseURL}/posts`, (req, res, ctx) => {
				const posts: IPost[] = [
					{
						id: 'post1',
						title: 'My First post',
						content: 'This is the content of my first post',
						shortDescription: 'This is the description of my first post',
						blogId: 'blog1',
						createdAt: '2021-08-01T00:00:00.000Z',
						blogName: 'My First blog'
					},

					{
						id: 'post2',
						title: 'My Second post',
						content: 'This is the content of my second post',
						shortDescription: 'This is the description of my second post',
						blogId: 'blog2',
						createdAt: '2021-08-01T00:00:00.000Z',
						blogName: 'My Second blog'
					}
				]
				return res(
					ctx.status(200),
					ctx.json({
						items: posts
					})
				)
			}),
			rest.post(`${baseURL}/posts`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.delete(`${baseURL}/posts/*`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.put(`${baseURL}/posts/*`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof PostsPage>

export const Light = () => {
	useEffect(() => {
		document.body.dataset.theme = 'light'
	}, [])

	return (
		<MemoryRouter initialEntries={['/posts/']}>
			<Routes>
				<Route path={'/posts'} element={<PostsPage />} />
			</Routes>
		</MemoryRouter>
	)
}

export const Dark = () => {
	useEffect(() => {
		document.body.dataset.theme = 'dark'
	}, [])

	return (
		<MemoryRouter initialEntries={['/posts/']}>
			<Routes>
				<Route path={'/posts'} element={<PostsPage />} />
			</Routes>
		</MemoryRouter>
	)
}
