import { Blogs } from '../ui'
import { server } from '@app/tests/msw/server'
import { IBlog, IBlogResponse } from '@entities/Blog/model/blog.types'
import { api } from '@shared/api'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'

describe('Blogs page', () => {
	const storeRef = setupApiStore(api, {})

	const items = [
		{
			id: '1',
			name: 'Blog 1',
			description: 'Description for Blog 1'
		},
		{
			id: '2',
			name: 'Blog 2',
			description: 'Description for Blog 2'
		}
	] as IBlog[]

	const mockServerResponse: IBlogResponse = {
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
			rest.get('https://ht-02-03.vercel.app/api/blogs', (req, res, ctx) => {
				console.log('getting items')
				const searchTermName = req.url.searchParams.get('searchNameTerm')
				if (searchTermName) {
					console.log('filtering items')
					mockServerResponse.items = mockServerResponse.items.filter(item =>
						item.name.toLowerCase().includes(searchTermName.toLowerCase())
					)
					console.log(mockServerResponse.items)
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
