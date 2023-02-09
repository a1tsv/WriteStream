import { Blogs } from '../ui'
import { Modals } from '@app/providers/ModalsProvider'
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
import { Route, Routes } from 'react-router'

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

	it('should navigate to blog details page', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<Routes>
							<Route path='/blogs/:id' element={<div>Blog 1 Details</div>} />
						</Routes>
						<Blogs />
					</>
				)
			}),
			{}
		)

		expect(await screen.findByText('Blog 1')).toBeInTheDocument()
		await userEvent.click(screen.getByText('Blog 1'))
		expect(await screen.findByText('Blog 1 Details')).toBeInTheDocument()
	})

	it('should open add blog modal', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<Modals>
						<Blogs />
					</Modals>
				)
			}),
			{}
		)

		await userEvent.click(screen.getByText('New Blog'))
		expect(await screen.findByText('Add blog')).toBeInTheDocument()
	})

	it('should open edit blog modal', async () => {
		const { container } = renderWithRouter(
			storeRef.wrapper({
				children: (
					<Modals>
						<Blogs />
					</Modals>
				)
			}),
			{}
		)

		await userEvent.click(screen.getByText('Dropdown label'))
		await userEvent.click(await screen.findByText('Edit blog'))
		expect(await screen.findByText('Edit blog')).toBeInTheDocument()
	})

	it('should open delete blog modal', async () => {
		const { container } = renderWithRouter(
			storeRef.wrapper({
				children: (
					<Modals>
						<Blogs />
					</Modals>
				)
			}),
			{}
		)

		await userEvent.click(screen.getByText('Dropdown label'))
		await userEvent.click(await screen.findByText('Delete blog'))
		expect(await screen.findByText('Delete blog')).toBeInTheDocument()
	})
})
