import { server } from '@app/tests/msw'
import { IComment } from '@entities/Comment'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@storybook/testing-library'
import { Comments } from '@widgets/Comments'
import { rest } from 'msw'

describe('Comments', () => {
	const storeRef = setupApiStore(api, {})

	const items: IComment[] = [
		{
			id: '1',
			content: 'Comment 1',
			userId: '1',
			createdAt: '2021-01-01',
			userLogin: 'user1'
		},
		{
			id: '2',
			content: 'Comment 2',
			userId: '2',
			createdAt: '2021-01-01',
			userLogin: 'user2'
		}
	]

	const mockServerResponse: IGetItemsResponse<IComment[]> = {
		items,
		pagesCount: 1,
		page: 1,
		pageSize: 1,
		totalCount: 1
	}

	beforeEach(() => {
		server.use(
			rest.get(`${baseURL}/posts/1/comments`, (req, res, ctx) => {
				return res(ctx.json(mockServerResponse))
			}),
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				console.log('in auth me interceptor')
				return res(ctx.status(200), ctx.json({ id: '1', login: 'user1' }))
			})
		)
	})

	it('should render comments properly', () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		expect(screen.getByText('Comments(2)')).toBeInTheDocument()
		expect(screen.getByText('Comment 1')).toBeInTheDocument()
		expect(screen.getByText('Comment 2')).toBeInTheDocument()
	})

	it('should show add new comment form when user is authorized', () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		expect(screen.getByText('Add comment')).toBeInTheDocument()
	})

	it('should not show add new comment form when user is not authorized', () => {
		server.use(
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res(ctx.status(401))
			})
		)

		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		expect(screen.queryByText('Add comment')).not.toBeInTheDocument()
	})
})
