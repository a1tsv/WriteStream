import { server } from '@app/tests/msw'
import { IUser } from '@entities/User'
import { DeleteUserModal } from '@features/DeleteUserModal'
import { Transition } from '@headlessui/react'
import { adminAPI } from '@shared/api'
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
				user: {
					login: 'UserLogin',
					id: '1'
				}
			},
			isOpen: true
		}
	}))
}))

describe('DeleteUserModal', () => {
	const storeRef = setupApiStore(adminAPI, {})

	let items: IUser[]

	beforeEach(() => {
		items = [
			{
				id: '1',
				login: 'UserLogin',
				email: 'test@gmail.com',
				createdAt: '2021-07-01T12:00:00.000Z'
			}
		]

		server.use(
			rest.delete(`${baseURL}/users/1`, (req, res, ctx) => {
				const index = items.findIndex(item => item.id === '1')
				items.splice(index, 1)
				return res(ctx.json({}))
			})
		)
	})

	it('renders the Delete User modal with the title and message', () => {
		render(
			<Transition show={true}>
				<DeleteUserModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Delete')).toBeInTheDocument()
		expect(
			screen.getByText('Do you want to delete this user?')
		).toBeInTheDocument()
	})

	it('calls the deleteUser mutation when the delete button is clicked', async () => {
		render(
			<Transition show={true}>
				<DeleteUserModal />
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
				<DeleteUserModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const cancelButton = screen.getByRole('button', { name: 'Cancel' })
		fireEvent.click(cancelButton)
		expect(closeModal).toHaveBeenCalled()
	})
})
