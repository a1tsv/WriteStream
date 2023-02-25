import { server } from '@app/tests/msw'
import { IBlog } from '@entities/Blog'
import { DeleteBlogModal } from '@features/DeleteBlogModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'

const closeModal = jest.fn()

jest.mock('@app/providers/ModalsProvider/model/modals.data.ts', () => ({
	...jest.requireActual('@app/providers/ModalsProvider/model/modals.data.ts'),
	useModalContext: jest.fn(() => ({
		closeModal,
		store: {
			modalProps: {
				blog: {
					name: 'Blog 1',
					id: '1'
				}
			},
			isOpen: true
		}
	}))
}))

describe('DeleteBlogModal', () => {
	const storeRef = setupApiStore(api, {})

	let items: IBlog[]

	beforeEach(() => {
		items = [
			{
				name: 'Blog 1',
				id: '1',
				websiteUrl: 'https://www.google.com',
				description: 'Blog 1 description',
				createdAt: '2021-08-01T00:00:00.000Z',
				isMembership: false
			}
		]

		server.use(
			rest.delete(`${baseURL}/blogs/1`, (req, res, ctx) => {
				const index = items.findIndex(item => item.id === '1')
				items.splice(index, 1)
				return res(ctx.json({}))
			})
		)
	})

	it('renders the Delete Blog modal with the title and message', () => {
		render(
			<Transition show={true}>
				<DeleteBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Blog 1')).toBeInTheDocument()
		expect(
			screen.getByText('Do you want to delete this blog?')
		).toBeInTheDocument()
	})

	it('calls the deleteBlog mutation when the delete button is clicked', async () => {
		render(
			<Transition show={true}>
				<DeleteBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const deleteButton = screen.getByRole('button', { name: 'Submit' })
		fireEvent.click(deleteButton)
		await waitFor(() => expect(items).toHaveLength(0))
	})

	it('calls the closeModal function when the cancel button is clicked', () => {
		render(
			<Transition show={true}>
				<DeleteBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const cancelButton = screen.getByRole('button', { name: 'Cancel' })
		fireEvent.click(cancelButton)
		expect(closeModal).toHaveBeenCalled()
	})
})
