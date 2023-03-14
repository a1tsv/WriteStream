import { NewPassword } from '../ui'
import { server } from '@app/tests/msw'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

describe('NewPassword', () => {
	const storeRef = setupApiStore(api, {})

	const renderWithCode = (children: ReactElement) => {
		renderWithRouter(storeRef.wrapper({ children }), {
			route: '/new-password?code=123'
		})
	}

	const enterValidData = async () => {
		const passwordText = 'testtesttest'
		const passwordInput = screen.getByLabelText('New password:')
		const repeatPasswordInput = screen.getByLabelText('Repeat password:')

		await userEvent.type(passwordInput, passwordText)
		await userEvent.type(repeatPasswordInput, passwordText)
	}

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/auth/new-password`, (req, res, ctx) => {
				return res(ctx.json({}))
			}),
			rest.post(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res(ctx.json({}))
			})
		)
	})

	it('renders the forgot password form', () => {
		renderWithCode(<NewPassword />)

		expect(screen.getAllByText('Set new password')[0]).toBeInTheDocument()
	})

	it('should throw errors if fields are empty', async () => {
		renderWithCode(<NewPassword />)
		await pressTabTimes(4)

		expect(await screen.findByText('Password is required')).toBeInTheDocument()
		expect(
			await screen.findByText('Repeat password is required')
		).toBeInTheDocument()
	})

	it('should throw errors in values in fields are incorrect', async () => {
		renderWithCode(<NewPassword />)

		const passwordInput = screen.getByLabelText('New password:')
		const repeatPasswordInput = screen.getByLabelText('Repeat password:')

		await userEvent.type(passwordInput, 'test')
		await userEvent.type(repeatPasswordInput, 'tst')
		await pressTabTimes(1)

		expect(
			await screen.findByText('Password should be at least 8 characters')
		).toBeInTheDocument()
		expect(
			await screen.findByText('Your passwords do not match')
		).toBeInTheDocument()
	})

	it('should redirect to login page when redirect button was pressed', async () => {
		renderWithCode(
			<Routes>
				<Route path='/login' element={<div>Login</div>} />
				<Route path='/new-password' element={<NewPassword />} />
			</Routes>
		)

		await enterValidData()

		await userEvent.click(
			screen.getByRole('button', { name: 'Set new password' })
		)

		expect(await screen.findByText('Login')).toBeInTheDocument()
	})

	it('should send email the user when all fields are valid', async () => {
		renderWithCode(
			<>
				<NewPassword />
				<ToastContainer />
			</>
		)

		await enterValidData()

		await userEvent.click(
			screen.getByRole('button', { name: 'Set new password' })
		)

		expect(
			await screen.findByText(`Your password has been successfully recovered!`)
		).toBeInTheDocument()
	})
})

const pressTabTimes = async (times: number) => {
	for (let i = 0; i < times; i++) {
		await userEvent.tab()
	}
}
