import { server } from '@app/tests/msw'
import { IBlog } from '@entities/Blog'
import { IBlogUpdateRequest } from '@entities/Blog/api/blog.interface'
import { AddBlogModal } from '@features/AddBlogModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'

const mockBlog = {
	id: '2',
	name: 'Test',
	websiteUrl: 'https://test.com',
	description: 'Test description'
}

jest.mock('@app/providers/ModalsProvider/model/modals.data.ts', () => {
	return {
		...jest.requireActual('@app/providers/ModalsProvider/model/modals.data.ts'),
		useModalContext: jest.fn(() => ({
			closeModal: jest.fn(),
			store: { isOpen: true, modalProps: { blog: mockBlog } }
		}))
	}
})

describe('Update mode', () => {
	const storeRef = setupApiStore(api, {})

	const items: IBlog[] = [
		{
			isMembership: false,
			name: 'Test',
			description: 'Test',
			id: '2',
			websiteUrl: 'https://test.com',
			createdAt: '2021-07-01T12:00:00.000Z'
		}
	]

	beforeEach(() => {
		server.use(
			rest.put(`${baseURL}/blogs/*`, (req, res, ctx) => {
				console.log('intercepting')
				const { id } = req.body as IBlogUpdateRequest
				const index = items.findIndex(item => item.id === id)
				items[index] = req.body as IBlog
				console.log(items)
				return res(ctx.status(200), ctx.json({}))
			})
		)
	})

	it('should contain blog data in the form', () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByLabelText('Name:')).toHaveValue(mockBlog.name)
		expect(screen.getByLabelText('Website:')).toHaveValue(mockBlog.websiteUrl)
		expect(screen.getByLabelText('Description:')).toHaveValue(
			mockBlog.description
		)
	})

	it('should update blog data', async () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const nameInput = screen.getByLabelText('Name:')
		fireEvent.change(nameInput, {
			target: { value: 'Test2' }
		})

		const websiteInput = screen.getByLabelText('Website:')
		fireEvent.change(websiteInput, {
			target: { value: 'https://test2.com' }
		})

		const descriptionInput = screen.getByLabelText('Description:')
		fireEvent.change(descriptionInput, {
			target: {
				value: 'Test description 2'
			}
		})

		const submitButton = screen.getByRole('button', { name: 'Submit' })
		fireEvent.click(submitButton)

		await waitFor(() => {
			const updatedBlog = items.find(item => item.id === mockBlog.id)
			expect(updatedBlog?.name).toBe('Test2')
		})
	})
})
