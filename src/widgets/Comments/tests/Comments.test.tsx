import { Comments } from '../ui'
import { Modals } from '@app/providers/ModalsProvider'
import { server } from '@app/tests/msw'
import { IComment } from '@entities/Comment'
import { api } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { Route, Routes } from 'react-router-dom'

describe('Comments', () => {
	const storeRef = setupApiStore(api, {})

	let items: IComment[]

	beforeEach(() => {
		items = [
			{
				id: '1',
				content: 'Comment 1',
				createdAt: '2021-01-01',
				commentatorInfo: {
					userLogin: 'user1',
					userId: '1'
				}
			},
			{
				id: '2',
				content: 'Comment 2',
				createdAt: '2021-01-01',
				commentatorInfo: {
					userId: '2',
					userLogin: 'user2'
				}
			}
		]

		const mockServerResponse: IGetItemsResponse<IComment[]> = {
			items,
			pagesCount: 1,
			page: 1,
			pageSize: 1,
			totalCount: 1
		}

		server.use(
			rest.get(`${baseURL}/posts/1/comments`, (req, res, ctx) => {
				return res(ctx.json(mockServerResponse))
			}),
			rest.post(`${baseURL}/posts/1/comments`, (req, res, ctx) => {
				items.push(req.body as IComment)
				return res(ctx.json({}))
			}),
			rest.delete(`${baseURL}/comments/1`, (req, res, ctx) => {
				items.splice(0, 1)
				return res(ctx.json({}))
			}),
			rest.put(`${baseURL}/comments/1`, (req, res, ctx) => {
				const body = req.body as IComment
				items[0].content = body.content
				return res(ctx.json({}))
			}),
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({ userId: '1', login: 'user1' }))
			})
		)
	})

	it('should add the new comment when comment has correct length', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<Routes>
						<Route path='/posts/:id' element={<Comments items={items} />} />
					</Routes>
				)
			}),
			{
				route: '/posts/1'
			}
		)
		const input = await screen.findByPlaceholderText('Add a comment...')
		const button = screen.getByText('Add comment')
		expect(input).toBeInTheDocument()

		await userEvent.type(
			input,
			'Comment with correct length over 20 characters'
		)
		userEvent.click(button)

		await waitFor(() => {
			expect(items).toHaveLength(3)
		})
	})

	it('should update the comment when submit in edit comment modal was pressed', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: <Comments items={items} />
			}),
			{}
		)

		const dropdownBtn = await screen.findByLabelText('dropdown button')
		await userEvent.click(dropdownBtn)

		await userEvent.click(await screen.findByText('Edit comment'))

		const input = await screen.findByText('Comment 1')
		const submitButton = await screen.findByText('Edit comment')
		const commentText = 'Updated comment with more than 20 characters in it'

		expect(await screen.findByText('Comment 1')).toBeInTheDocument()

		await userEvent.clear(input)
		await userEvent.type(input, commentText)

		await userEvent.click(submitButton)

		await waitFor(() => {
			expect(items[0].content).toBe(commentText)
		})
	})

	it('should show add new comment form when user is authorized', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		expect(await screen.findByText('Add comment')).toBeInTheDocument()
	})

	it('should delete the comment when submit in delete comment modal was pressed', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<Modals>
						<Comments items={items} />
					</Modals>
				)
			}),
			{}
		)
		await waitFor(async () => {
			const dropdownBtn = await screen.findByLabelText('dropdown button')
			await userEvent.click(dropdownBtn)
		})

		await userEvent.click(await screen.findByText('Delete comment'))

		const submitButton = await screen.findByText('Submit')
		await userEvent.click(submitButton)

		await waitFor(() => {
			expect(items).toHaveLength(1)
		})
	})

	it('button should be disabled when length of the comment content is less than 20 characters', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)
		const input = await screen.findByPlaceholderText('Add a comment...')
		const button = screen.getByText('Add comment')

		await userEvent.type(input, 'Incorrect length')
		userEvent.click(button)

		await waitFor(() => {
			expect(items).toHaveLength(2)
		})
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
