import { server } from '@app/tests/msw'
import { IPost } from '@entities/Post'
import { BlogPage } from '@pages/Blog'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'
import { Route, Routes } from 'react-router'

describe('Blog', () => {
	const storeRef = setupApiStore(api, {})

	beforeAll(() => {
		server.listen()
		fetchMock.disableMocks()
	})

	beforeEach(() => {
		server.use(
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
			}),
			rest.get(`${baseURL}/posts`, (req, res, ctx) => {
				const posts: IPost[] = [
					{
						id: '1',
						title: 'My First Post',
						shortDescription: 'This is my first post',
						content: 'This is my first post',
						createdAt: '2021-01-01T00:00:00.000Z',
						blogId: 'blog1',
						blogName: 'My Blog'
					},
					{
						id: '2',
						title: 'My Second Post',
						content: 'This is my second post',
						createdAt: '2021-01-01T00:00:00.000Z',
						blogId: 'blog1',
						blogName: 'My Blog',
						shortDescription: 'This is my second post'
					}
				]
				return res(
					ctx.json({
						items: posts
					})
				)
			})
		)
	})

	afterEach(() => {
		server.resetHandlers()
		storeRef.store.dispatch(api.util.resetApiState())
	})

	it('should render blog', async () => {
		renderWithRouter(storeRef.wrapper({ children: <BlogPage /> }), {
			route: '/blogs/blog1'
		})

		expect(await screen.findByText('My Blog')).toBeInTheDocument()
		expect(await screen.findByText('This is my blog')).toBeInTheDocument()
		expect(await screen.findByText('https://myblog.com')).toBeInTheDocument()
	})
	it('should render posts', async () => {
		renderWithRouter(storeRef.wrapper({ children: <BlogPage /> }), {
			route: '/blogs/blog1'
		})

		expect(await screen.findByText('My First Post')).toBeInTheDocument()
		expect(await screen.findByText('This is my first post')).toBeInTheDocument()
		expect(await screen.findByText('My Second Post')).toBeInTheDocument()
		expect(
			await screen.findByText('This is my second post')
		).toBeInTheDocument()
	})

	it('should navigate back to blogs after clicking on the "Back to blogs" button', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<Routes>
							<Route path='/blogs' element={<div>Blogs</div>} />
						</Routes>
						<BlogPage />
					</>
				)
			}),
			{
				route: '/blogs/blog1'
			}
		)

		const backTo = screen.getByRole('button', { name: /back to blogs/i })
		expect(backTo).toBeInTheDocument()
		await userEvent.click(backTo)
		expect(await screen.findByText('Blogs')).toBeInTheDocument()
	})
})
