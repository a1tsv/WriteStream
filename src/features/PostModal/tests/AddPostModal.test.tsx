import { server } from '@app/tests/msw'
import { IPost } from '@entities/Post'
import { PostModal } from '@features/PostModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

const generateString = (value: number) => {
	return Array(value)
		.fill(0)
		.map(() => 'a')
		.join('')
}

jest.mock('@app/providers/ModalsProvider', () => {
	return {
		useModalContext: jest.fn(() => ({
			closeModal: jest.fn(),
			store: {
				isOpen: true,
				modalProps: {},
				closeModal: jest.fn()
			}
		}))
	}
})

describe('AddPostModal', () => {
	const storeRef = setupApiStore(api, {})
	const invalidContent = generateString(501)

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
			rest.post(`${baseURL}/posts`, (req, res, ctx) => {
				items.push(req.body as IPost)
				return res(ctx.json({}))
			})
		)
	})

	it('renders the add post modal with the title', () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Add post')).toBeInTheDocument()
	})

	it('should display error message when title length is more than 10', async () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const nameInput = screen.getByLabelText('Title:')
		fireEvent.change(nameInput, {
			target: { value: invalidContent }
		})
		fireEvent.blur(nameInput)

		expect(
			await screen.findByText('Title must contain 4 or less characters')
		).toBeInTheDocument()
	})

	it('should display error message when description is not valid', async () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const descriptionInput = screen.getByLabelText('Description:')
		fireEvent.change(descriptionInput, {
			target: { value: invalidContent }
		})
		fireEvent.blur(descriptionInput)

		expect(
			await screen.findByText('Description must contain 40 or less characters')
		).toBeInTheDocument()
	})

	it('should display error message when content length is more than 500', async () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const contentInput = screen.getByLabelText('Content:')
		fireEvent.change(contentInput, {
			target: {
				value: invalidContent
			}
		})
		fireEvent.blur(contentInput)
		expect(
			await screen.findByText('Content must contain less than 500 characters')
		).toBeInTheDocument()
	})

	it('should be able to pick another blog', async () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,

			{ wrapper: storeRef.wrapper }
		)

		const blogSelect = screen.getByPlaceholderText('Search')
		expect(blogSelect).toBeInTheDocument()
		await userEvent.type(blogSelect, 'Blog 2')
		const secondBlog = await screen.findByText('Blog 2')
		expect(secondBlog).toBeInTheDocument()
	})

	it('should add post when all fields are valid', async () => {
		render(
			<Transition show={true}>
				<PostModal />
			</Transition>,

			{ wrapper: storeRef.wrapper }
		)

		const titleInput = screen.getByLabelText('Title:')
		const descriptionInput = screen.getByLabelText('Description:')
		const contentInput = screen.getByLabelText('Content:')
		const blogSelect = screen.getByPlaceholderText('Search')

		await userEvent.type(titleInput, 'Test')
		await userEvent.type(descriptionInput, 'Test')
		await userEvent.type(contentInput, 'Test')
		await userEvent.type(blogSelect, '2')
		const secondBlog = await screen.findByText('Blog 2')
		expect(secondBlog).toBeInTheDocument()
		await userEvent.click(secondBlog)

		const submitButton = screen.getByText('Submit')
		await userEvent.click(submitButton)

		await waitFor(() => {
			expect(items).toHaveLength(2)
		})
	})
})
