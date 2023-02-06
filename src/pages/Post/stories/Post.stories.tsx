import { StoreDecorator } from '@app/providers/StoreDecorator'
import { PostPage } from '@pages/Post'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { useEffect } from 'react'
import { MemoryRouter, Routes } from 'react-router'
import { Route } from 'react-router-dom'

export default {
	title: 'Post',
	component: PostPage,
	decorators: [StoreDecorator],
	parameters: {
		msw: [
			rest.get(`${baseURL}/posts/1`, (req, res, ctx) => {
				return res(
					ctx.json({
						id: '123',
						blogName: 'My Blog',
						title: 'My Post',
						content: 'This is my post content',
						createdAt: '2023-02-06T00:00:00.000Z'
					})
				)
			})
		]
	}
} as ComponentMeta<typeof PostPage>

export const Default = () => {
	useEffect(() => {
		document.body.dataset.theme = 'light'
	}, [])

	return (
		<MemoryRouter initialEntries={['/posts/1']}>
			<Routes>
				<Route path={'/posts/:id'} element={<PostPage />} />
			</Routes>
		</MemoryRouter>
	)
}
