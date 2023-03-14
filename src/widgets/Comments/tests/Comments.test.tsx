import { Comments } from '../ui'
import { Modals } from '@app/providers/ModalsProvider'
import { server } from '@app/tests/msw'
import { IComment } from '@entities/Comment'
import { IRatePayload } from '@entities/Comment/model'
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
				},
				likesInfo: {
					likesCount: 10,
					dislikesCount: 5,
					myStatus: 'None'
				}
			},
			{
				id: '2',
				content: 'Comment 2',
				createdAt: '2021-01-01',
				commentatorInfo: {
					userId: '2',
					userLogin: 'user2'
				},
				likesInfo: {
					likesCount: 20,
					dislikesCount: 15,
					myStatus: 'Dislike'
				}
			},
			{
				id: '3',
				content: 'Comment 3',
				createdAt: '2021-01-31',
				commentatorInfo: {
					userId: '3',
					userLogin: 'user3'
				},
				likesInfo: {
					likesCount: 12,
					dislikesCount: 1,
					myStatus: 'Like'
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
			rest.get(`${baseURL}/posts/*/comments`, (req, res, ctx) => {
				return res(ctx.json(mockServerResponse))
			}),
			rest.post(`${baseURL}/posts/*/comments`, (req, res, ctx) => {
				items.push(req.body as IComment)
				return res(ctx.json({}))
			}),

			rest.put(`${baseURL}/comments/*/like-status`, (req, res, ctx) => {
				const { likeStatus: sendedLikeStatus } = req.body as IRatePayload
				console.log('IN INTERCEPTOR')

				items = items.map(comment => {
					const currentMyStatus = comment.likesInfo.myStatus
					let likesCount = comment.likesInfo.likesCount
					let dislikesCount = comment.likesInfo.dislikesCount

					if (sendedLikeStatus !== 'None') {
						sendedLikeStatus === 'Like' ? likesCount++ : dislikesCount++
					}

					if (currentMyStatus !== 'None') {
						currentMyStatus === 'Like' ? likesCount-- : dislikesCount--
					}

					const newComment: IComment = {
						...comment,
						likesInfo: { likesCount, dislikesCount, myStatus: sendedLikeStatus }
					}

					console.log(comment.id === req.params[0], 'FIND COMMENT')

					return comment.id === req.params[0] ? newComment : comment
				})

				console.log(items)

				return res(ctx.json({}))
			}),
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({ userId: '1', login: 'user1' }))
			}),
			rest.delete(`${baseURL}/comments/*`, (req, res, ctx) => {
				items.splice(0, 1)
				return res(ctx.json({}))
			}),
			rest.put(`${baseURL}/comments/*`, (req, res, ctx) => {
				const body = req.body as IComment
				items[0].content = body.content
				return res(ctx.json({}))
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
			expect(items).toHaveLength(4)
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
			expect(items).toHaveLength(2)
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
			expect(items).toHaveLength(3)
		})
	})

	it('should change the likes count when pressed like button', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		const likeButtons = screen.getAllByLabelText('Like the comment')
		await userEvent.click(likeButtons[0])

		await waitFor(() => {
			expect(items.find(item => item.id === '1')?.likesInfo.likesCount).toBe(11)
		})
	})

	it('should remove the like when pressed like button after already liking the comment', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		const likeButtons = screen.getAllByLabelText('Like the comment')
		await userEvent.click(likeButtons[2])

		await waitFor(() => {
			expect(items.find(item => item.id === '3')?.likesInfo.likesCount).toBe(11)
		})

		await waitFor(() => {
			expect(items.find(item => item.id === '3')?.likesInfo.dislikesCount).toBe(
				1
			)
		})
	})

	it('should change the dislikes count when pressed dislike button', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		const likeButtons = screen.getAllByLabelText('Dislike the comment')
		await userEvent.click(likeButtons[0])

		await waitFor(() => {
			expect(items.find(item => item.id === '1')?.likesInfo.dislikesCount).toBe(
				6
			)
		})
	})

	it('should remove one like and add one dislike when pressed like button after like', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		const likeButtons = screen.getAllByLabelText('Dislike the comment')
		await userEvent.click(likeButtons[2])

		await waitFor(() => {
			expect(items.find(item => item.id === '3')?.likesInfo.dislikesCount).toBe(
				2
			)
		})

		await waitFor(() => {
			expect(items.find(item => item.id === '3')?.likesInfo.likesCount).toBe(11)
		})
	})

	it('should remove one dislike and add one like when pressed like button after like', async () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		const likeButtons = screen.getAllByLabelText('Like the comment')
		await userEvent.click(likeButtons[1])

		await waitFor(() => {
			expect(items.find(item => item.id === '2')?.likesInfo.likesCount).toBe(21)
		})

		await waitFor(() => {
			expect(items.find(item => item.id === '2')?.likesInfo.dislikesCount).toBe(
				14
			)
		})
	})

	it('should render comments properly', () => {
		renderWithRouter(
			storeRef.wrapper({ children: <Comments items={items} /> }),
			{}
		)

		expect(screen.getByText('Comments(3)')).toBeInTheDocument()
		expect(screen.getByText('Comment 1')).toBeInTheDocument()
		expect(screen.getByText('Comment 2')).toBeInTheDocument()
		expect(screen.getByText('Comment 3')).toBeInTheDocument()
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
