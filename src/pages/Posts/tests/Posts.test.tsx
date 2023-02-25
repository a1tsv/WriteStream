import { server } from '@app/tests/msw'
import { IPost } from '@entities/Post'
import { PostsPage } from '@pages/Posts'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import { rest } from 'msw'

describe('Posts', () => {
	const storeRef = setupApiStore(api, {})

	const items: IPost[] = [
		{
			id: '1',
			createdAt: '2021-01-01',
			blogId: '1',
			shortDescription: 'Short description for post 1',
			content: 'Content for post 1',
			title: 'Post 1',
			blogName: 'Blog 1'
		},
		{
			id: '2',
			createdAt: '2021-01-01',
			blogId: '1',
			shortDescription: 'Short description for post 2',
			content: 'Content for post 2',
			title: 'Post 2',
			blogName: 'Blog 1'
		}
	]

	const mockServerResponse: IGetItemsResponse<IPost[]> = {
		items,
		pagesCount: 1,
		page: 1,
		pageSize: 1,
		totalCount: 1
	}

	beforeEach(() => {
		server.use(
			rest.get(`${baseURL}/posts`, (req, res, ctx) => {
				return res(ctx.json(mockServerResponse))
			})
		)
	})

	it('should render posts page', async () => {
		renderWithRouter(storeRef.wrapper({ children: <PostsPage /> }), {})
		expect(await screen.findByText('Post 1')).toBeInTheDocument()
		expect(await screen.findByText('Post 2')).toBeInTheDocument()
	})
})
