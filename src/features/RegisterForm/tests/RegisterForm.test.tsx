import { RegisterForm } from '../ui'
import { AppRouter } from '@app/providers'
import { server } from '@app/tests/msw'
import { LoginForm } from '@features/LoginForm'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { getItemFromLC } from '@shared/utils/localStorage'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { ToastContainer } from 'react-toastify'

describe('RegisterForm', () => {
	const storeRef = setupApiStore(api, {})

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/auth/registration`, (req, res, ctx) => {
				console.log('in registration interceptor')

				return res(ctx.json({}))
			})
		)
	})

	it('renders the login form', () => {
		renderWithRouter(storeRef.wrapper({ children: <RegisterForm /> }), {})

		expect(screen.getAllByText('Register')[0]).toBeInTheDocument()
	})

	it('should throw errors if fields are empty', async () => {
		renderWithRouter(storeRef.wrapper({ children: <RegisterForm /> }), {})

		await pressTabTimes(4)

		expect(await screen.findByText('Username is required')).toBeInTheDocument()
		expect(await screen.findByText('Email is required')).toBeInTheDocument()
		expect(await screen.findByText('Password is required')).toBeInTheDocument()
	})

	it('should throw errors in values in fields are incorrect', async () => {
		renderWithRouter(storeRef.wrapper({ children: <RegisterForm /> }), {})

		const usernameInput = screen.getByLabelText('Username:')
		const emailInput = screen.getByLabelText('Email:')
		const passwordInput = screen.getByLabelText('Password:')

		await userEvent.type(usernameInput, 'test')
		await userEvent.type(emailInput, 'testtesttest')
		await userEvent.type(passwordInput, 'test')
		await pressTabTimes(1)

		expect(
			await screen.findByText('Username should be at least 5 characters')
		).toBeInTheDocument()
		expect(await screen.findByText('Email is invalid')).toBeInTheDocument()
		expect(
			await screen.findByText('Password should be at least 8 characters')
		).toBeInTheDocument()
	})

	it('should register the user when all fields are valid', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<RegisterForm />
						<ToastContainer />
					</>
				)
			}),
			{}
		)

		const email = 'email@gmail.com'
		const usernameInput = screen.getByLabelText('Username:')
		const emailInput = screen.getByLabelText('Email:')
		const passwordInput = screen.getByLabelText('Password:')

		await userEvent.type(usernameInput, 'test5')
		await userEvent.type(emailInput, email)
		await userEvent.type(passwordInput, 'testtesttesttest')

		await userEvent.click(screen.getByRole('button', { name: 'Register' }))

		expect(
			await screen.findByText(
				`We have sent a link to confirm you email to ${email}`
			)
		).toBeInTheDocument()
	})
})

const pressTabTimes = async (times: number) => {
	for (let i = 0; i < times; i++) {
		await userEvent.tab()
	}
}
