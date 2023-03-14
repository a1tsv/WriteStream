import { ForgotPassword } from '../ui'
import { server } from '@app/tests/msw'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

describe('ForgotPassword', () => {
	const storeRef = setupApiStore(api, {})

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/auth/password-recovery`, (req, res, ctx) => {
				return res(ctx.json({}))
			})
		)
	})

	it('renders the forgot password form', () => {
		renderWithRouter(storeRef.wrapper({ children: <ForgotPassword /> }), {})

		expect(screen.getAllByText('Forgot password')[0]).toBeInTheDocument()
	})

	it('should throw errors if fields are empty', async () => {
		renderWithRouter(storeRef.wrapper({ children: <ForgotPassword /> }), {})
		await pressTabTimes(2)

		expect(await screen.findByText('Email is required')).toBeInTheDocument()
	})

	it('should throw errors in values in fields are incorrect', async () => {
		renderWithRouter(storeRef.wrapper({ children: <ForgotPassword /> }), {})

		const emailInput = screen.getByLabelText('Email:')

		await userEvent.type(emailInput, 'testtesttest')
		await pressTabTimes(1)

		expect(await screen.findByText('Email is invalid')).toBeInTheDocument()
	})

	it('should redirect to login page when redirect button was pressed', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<Routes>
						<Route path='/login' element={<div>Login</div>} />
						<Route path='/password-recovery' element={<ForgotPassword />} />
					</Routes>
				)
			}),
			{ route: '/password-recovery' }
		)
		await userEvent.click(screen.getByText('Back to sign in'))
		expect(await screen.findByText('Login')).toBeInTheDocument()
	})

	it('should send email the user when all fields are valid', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<ForgotPassword />
						<ToastContainer />
					</>
				)
			}),
			{}
		)

		const email = 'email@gmail.com'
		const emailInput = screen.getByLabelText('Email:')

		await userEvent.type(emailInput, email)

		await userEvent.click(
			screen.getByRole('button', { name: 'Send instructions' })
		)

		expect(
			await screen.findByText(`We have sent a recovery link to ${email}`)
		).toBeInTheDocument()
	})
})

const pressTabTimes = async (times: number) => {
	for (let i = 0; i < times; i++) {
		await userEvent.tab()
	}
}
