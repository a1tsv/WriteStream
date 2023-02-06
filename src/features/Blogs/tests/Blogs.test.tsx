import { Blogs } from '../ui'
import { server } from '@app/tests/msw/server'
import { IBlog } from '@entities/Blog/api/blog.interface'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'

describe('Blogs page', () => {
	const storeRef = setupApiStore(api, {})

	const items: IBlog[] = [
		{
			id: '1',
			name: 'Blog 1',
			description: 'Description for Blog 1',
			websiteUrl: 'https://blog1.com',
			createdAt: '2021-01-01',
			isMembership: false
		},
		{
			id: '2',
			name: 'Blog 2',
			description: 'Description for Blog 2',
			websiteUrl: 'https://blog2.com',
			createdAt: '2021-01-01',
			isMembership: false
		}
	]

	const mockServerResponse: IGetItemsResponse<IBlog[]> = {
		items,
		pagesCount: 1,
		page: 1,
		pageSize: 1,
		totalCount: 1
	}

	beforeAll(() => {
		server.listen()
		fetchMock.disableMocks()
	})

	beforeEach(() => {
		server.use(
			rest.get(`${baseURL}/blogs`, (req, res, ctx) => {
				const searchTermName = req.url.searchParams.get('searchNameTerm')
				if (searchTermName) {
					const searchItems = mockServerResponse.items.filter(item =>
						item.name.toLowerCase().includes(searchTermName.toLowerCase())
					)
					mockServerResponse.items = searchItems
				}
				return res(ctx.json(mockServerResponse))
			})
		)
	})

	afterEach(() => {
		server.resetHandlers()
		storeRef.store.dispatch(api.util.resetApiState())
	})

	afterAll(() => server.close())

	it('should render', () => {
		renderWithRouter(storeRef.wrapper({ children: <Blogs /> }), {})
		expect(screen.getByText('Blogs')).toBeInTheDocument()
	})

	it('should render blogs', async () => {
		renderWithRouter(storeRef.wrapper({ children: <Blogs /> }), {})

		expect(await screen.findByText('Blog 1')).toBeInTheDocument()
		expect(await screen.findByText('Blog 2')).toBeInTheDocument()
	})

	it('should render blogs with search term after 500ms debounce delay', async () => {
		renderWithRouter(storeRef.wrapper({ children: <Blogs /> }), {})

		const searchTerm = 'blog 1'
		const input = screen.getByPlaceholderText('Search')

		await userEvent.type(input, searchTerm)

		await waitFor(() => expect(screen.queryByText('Blog 2')).toBeNull(), {
			timeout: 1500
		})
		expect(await screen.findByText('Blog 1')).toBeInTheDocument()
	})
})
