import { server } from '@app/tests/msw'
import { PostPage } from '@pages/Post'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { Route, Routes } from 'react-router'

describe('Post', () => {
	const storeRef = setupApiStore(api, {})

	beforeEach(() => {
		server.use(
			rest.get(`${baseURL}/posts/:id`, (req, res, ctx) => {
				return res(
					ctx.json({
						blogName: 'Test Blog',
						title: 'Test Post',
						content: 'Test Content',
						createdAt: '2022-01-01T01:00:00.000Z'
					})
				)
			})
		)
	})

	it('should render post', async () => {
		renderWithRouter(storeRef.wrapper({ children: <PostPage /> }), {
			route: '/posts/1'
		})
		expect(await screen.findByText('Test Post')).toBeInTheDocument()
		expect(await screen.findByText('Test Content')).toBeInTheDocument()
		expect(await screen.findByText('Test Blog')).toBeInTheDocument()
		expect(await screen.findByText('12/31/2021')).toBeInTheDocument()
	})

	it('should redirect to posts when backToPosts is clicked', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<Routes>
							<Route path='/posts' element={<div>Posts</div>} />
						</Routes>
						<Route path='/posts/:id' element={<PostPage />} />
					</>
				)
			}),
			{ route: '/posts/1' }
		)
		expect(await screen.findByText('Test Post')).toBeInTheDocument()
		await userEvent.click(await screen.findByText('Back to posts'))
		expect(await screen.findByText('Posts')).toBeInTheDocument()
	})
})
