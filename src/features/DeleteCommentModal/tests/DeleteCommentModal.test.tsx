import { server } from '@app/tests/msw'
import { IComment } from '@entities/Comment'
import { DeleteBlogModal } from '@features/DeleteBlogModal'
import { DeleteCommentModal } from '@features/DeleteCommentModal'
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
				comment: {
					id: '1'
				}
			},
			isOpen: true
		}
	}))
}))

describe('DeleteBlogModal', () => {
	const storeRef = setupApiStore(api, {})

	let items: IComment[]

	beforeEach(() => {
		items = [
			{
				id: '1',
				userLogin: 'user1',
				createdAt: '2021-08-01T00:00:00.000Z',
				content: 'Comment 1 content',
				userId: '1'
			}
		]

		server.use(
			rest.delete(`${baseURL}/comments/*`, (req, res, ctx) => {
				const index = items.findIndex(item => item.id === '1')
				items.splice(index, 1)
				return res(ctx.json({}))
			})
		)
	})

	it('renders the Delete Comment modal with the title and message', () => {
		render(
			<Transition show={true}>
				<DeleteCommentModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(
			screen.getByText('Do you want to delete this comment?')
		).toBeInTheDocument()
	})

	it('calls the deleteComment mutation when the delete button is clicked', async () => {
		render(
			<Transition show={true}>
				<DeleteCommentModal />
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
				<DeleteCommentModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const cancelButton = screen.getByRole('button', { name: 'Cancel' })
		fireEvent.click(cancelButton)
		expect(closeModal).toHaveBeenCalled()
	})
})
