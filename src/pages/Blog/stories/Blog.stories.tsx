import { StoreDecorator } from '@app/providers/StoreDecorator'
import { BlogPage } from '@pages/Blog'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { MemoryRouter, Routes } from 'react-router'
import { Route } from 'react-router-dom'

export default {
	title: 'Blog Page',
	component: BlogPage,
	decorators: [StoreDecorator],
	parameters: {
		msw: [
			rest.get(`${baseURL}/posts`, (req, res, ctx) => {
				return res(
					ctx.status(200),
					ctx.json({
						items: [
							{
								id: 'post1',
								title: 'My First Post',
								content: 'This is the content of my first post'
							},
							{
								id: 'post2',
								title: 'My Second Post',
								content: 'This is the content of my second post'
							}
						]
					})
				)
			}),
			rest.get(`${baseURL}/blogs/:id`, (req, res, ctx) => {
				return res(
					ctx.json({
						id: 'blog1',
						name: 'My Blog',
						description: 'This is my blog',
						websiteUrl: 'https://myblog.com',
						createdAt: '2021-01-01T00:00:00.000Z',
						isMembership: false
					})
				)
			})
		]
	}
} as ComponentMeta<typeof BlogPage>

export const Default = () => {
	return (
		<MemoryRouter initialEntries={['/blogs/1']}>
			<Routes>
				<Route path={'/blogs/:id'} element={<BlogPage />} />
			</Routes>
		</MemoryRouter>
	)
}
