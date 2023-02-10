import { server } from '@app/tests/msw'
import { IPost } from '@entities/Post'
import { PostModal } from '@features/PostModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'

const mockPost: IPost = {
	id: '1',
	title: 'Test',
	shortDescription: 'Test',
	content: 'Test',
	blogId: '1',
	blogName: 'Test',
	createdAt: '2021-08-10T14:00:00.000Z'
}

jest.mock('@app/providers/ModalsProvider', () => {
	return {
		useModalContext: jest.fn(() => ({
			closeModal: jest.fn(),
			store: {
				isOpen: true,
				modalProps: {
					post: mockPost
				},
				closeModal: jest.fn()
			}
		}))
	}
})

describe('AddPostModal', () => {
	const storeRef = setupApiStore(api, {})

	const items: IPost[] = [
		{
			id: '1',
			title: 'Test',
			blogName: 'Blog 1',
			createdAt: '2021-08-10T14:00:00.000Z',
			blogId: '1',
			shortDescription: 'Test',
			content: 'Test'
		}
	]

	beforeAll(() => {
		server.listen()
		fetchMock.disableMocks()
	})

	afterEach(() => {
		server.resetHandlers()
		storeRef.store.dispatch(api.util.resetApiState())
	})

	afterAll(() => server.close())

	beforeEach(() => {
		server.use(
			rest.get(`${baseURL}/blogs`, (req, res, ctx) => {
				console.log('getting blogs')
				return res(
					ctx.json({
						items: [
							{ id: '1', name: 'Blog 1' },
							{ id: '2', name: 'Blog 2' }
						]
					})
				)
			}),
			rest.put(`${baseURL}/posts/*`, (req, res, ctx) => {
				console.log('updating post')
				items[0] = req.body as IPost
				return res(ctx.json({}))
			})
		)
	})

	it('should contain blog data in the form', () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByLabelText('Title:')).toHaveValue(mockPost.title)
		expect(screen.getByLabelText('Description:')).toHaveValue(
			mockPost.shortDescription
		)
		expect(screen.getByLabelText('Content:')).toHaveValue(mockPost.content)
		expect(screen.getByPlaceholderText('Search')).toHaveValue(mockPost.blogName)
	})

	it('should update post', async () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const titleInput = screen.getByLabelText('Title:')
		const descriptionInput = screen.getByLabelText('Description:')
		const contentInput = screen.getByLabelText('Content:')

		const newTitle = 'New Title'
		const newDescription = 'New Description'
		const newContent = 'New Content'

		await userEvent.clear(titleInput)
		await userEvent.type(titleInput, newTitle)

		await userEvent.clear(descriptionInput)
		await userEvent.type(descriptionInput, newDescription)

		await userEvent.clear(contentInput)
		await userEvent.type(contentInput, newContent)

		const submitButton = screen.getByRole('button', { name: 'Submit' })
		submitButton.click()

		await waitFor(() => {
			expect(items[0].title).toBe(newTitle)
		})
		await waitFor(() => {
			expect(items[0].shortDescription).toBe(newDescription)
		})
		await waitFor(() => {
			expect(items[0].content).toBe(newContent)
		})
	})
})
