import { server } from '@app/tests/msw'
import { IPost } from '@entities/Post'
import { DeletePostModal } from '@features/DeletePostModal'
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
				post: {
					title: 'Delete Post',
					id: '1'
				}
			},
			isOpen: true
		}
	}))
}))

describe('DeletePostModal', () => {
	const storeRef = setupApiStore(api, {})

	let items: IPost[]

	beforeEach(() => {
		items = [
			{
				blogId: '1',
				content: 'Post 1 content',
				id: '1',
				title: 'Post 1',
				createdAt: '2021-08-01T00:00:00.000Z',
				blogName: 'Blog 1',
				shortDescription: 'Post 1 short description'
			}
		]

		server.use(
			rest.delete(`${baseURL}/posts/1`, (req, res, ctx) => {
				const index = items.findIndex(item => item.id === '1')
				items.splice(index, 1)
				return res(ctx.json({}))
			})
		)
	})

	it('renders the Delete Blog modal with the title and message', () => {
		render(
			<Transition show={true}>
				<DeletePostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Delete Post')).toBeInTheDocument()
		expect(
			screen.getByText('Do you want to delete this post?')
		).toBeInTheDocument()
	})

	it('calls the deletePost mutation when the delete button is clicked', async () => {
		render(
			<Transition show={true}>
				<DeletePostModal />
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
				<DeletePostModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const cancelButton = screen.getByRole('button', { name: 'Cancel' })
		fireEvent.click(cancelButton)
		expect(closeModal).toHaveBeenCalled()
	})
})
