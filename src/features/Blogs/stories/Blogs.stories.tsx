import { StoreDecorator } from '@app/providers/StoreDecorator'
import { Blogs } from '@features/Blogs'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { MemoryRouter, Routes } from 'react-router'
import { Route } from 'react-router-dom'

export default {
	title: 'Blogs',
	component: Blogs,
	decorators: [StoreDecorator],
	parameters: {
		msw: [
			rest.get(`${baseURL}/blogs`, (req, res, ctx) => {
				return res(
					ctx.status(200),
					ctx.json({
						items: [
							{
								id: 'blog1',
								title: 'My First blog',
								content: 'This is the content of my first blog',
								description: 'This is the description of my first blog'
							},
							{
								id: 'blog2',
								title: 'My Second Blog',
								content: 'This is the content of my second blog',
								description: 'This is the description of my second blog'
							}
						]
					})
				)
			})
		]
	}
} as ComponentMeta<typeof Blogs>

export const Default = () => {
	return (
		<MemoryRouter initialEntries={['/blogs/']}>
			<Routes>
				<Route path={'/blogs'} element={<Blogs />} />
			</Routes>
		</MemoryRouter>
	)
}
