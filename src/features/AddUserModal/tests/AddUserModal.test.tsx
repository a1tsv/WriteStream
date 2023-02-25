import { server } from '@app/tests/msw'
import { IUser } from '@entities/User'
import { AddUserModal } from '@features/AddUserModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

jest.mock('@app/providers/ModalsProvider', () => {
	return {
		useModalContext: jest.fn(() => ({
			closeModal: jest.fn(),
			store: { isOpen: true }
		}))
	}
})

describe('AddUserModal', () => {
	const storeRef = setupApiStore(api, {})
	const invalidData = Array(31)
		.fill(0)
		.map(() => 'a')
		.join('')

	const items: IUser[] = [
		{
			createdAt: '2021-07-01T12:00:00.000Z',
			email: 'email@tests.com',
			login: 'test',
			id: '1'
		}
	]

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/users`, (req, res, ctx) => {
				items.push(req.body as IUser)
				return res(ctx.json({}))
			})
		)
	})

	it('renders the Add User modal with the title', () => {
		render(
			<Transition show={true}>
				<AddUserModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Add user')).toBeInTheDocument()
	})

	it('should display error message when login length is more than 30', async () => {
		render(
			<Transition show={true}>
				<AddUserModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const loginInput = screen.getByLabelText('Login:')
		fireEvent.change(loginInput, {
			target: { value: invalidData }
		})
		fireEvent.blur(loginInput)

		expect(
			await screen.findByText('Login must contain 30 or less characters')
		).toBeInTheDocument()
	})

	it('should display error message when email is not valid', async () => {
		render(
			<Transition show={true}>
				<AddUserModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const websiteInput = screen.getByLabelText('Email:')
		fireEvent.change(websiteInput, {
			target: { value: invalidData }
		})
		fireEvent.blur(websiteInput)

		expect(
			await screen.findByText('Email must contain 30 or less characters')
		).toBeInTheDocument()
	})

	it('should add the user when all fields are valid', async () => {
		render(
			<Transition show={true}>
				<AddUserModal />
			</Transition>,

			{ wrapper: storeRef.wrapper }
		)

		const loginInput = screen.getByLabelText('Login:')
		const emailInput = screen.getByLabelText('Email:')
		const passwordInput = screen.getByLabelText('Password:')

		await userEvent.type(loginInput, 'Test')
		await userEvent.type(emailInput, 'Test@gmail.com')
		await userEvent.type(passwordInput, 'Testtesttest')

		const submitButton = screen.getByText('Submit')
		await userEvent.click(submitButton)

		await waitFor(() => {
			expect(items).toHaveLength(2)
		})
	})
})
