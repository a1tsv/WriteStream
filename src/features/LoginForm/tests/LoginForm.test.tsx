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

describe('LoginForm', () => {
	const storeRef = setupApiStore(api, {})
	const accessToken = 'test'

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/auth/login`, (req, res, ctx) => {
				return res(ctx.json({ accessToken }))
			}),
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res(ctx.json({}))
			}),
			rest.get(`${baseURL}/auth/refresh-token`, (req, res, ctx) => {
				return res(ctx.status(401))
			}),
			rest.get(`${baseURL}/blogs`, (req, res, ctx) => {
				return res(ctx.json({}))
			})
		)
	})

	it('renders the login form', () => {
		renderWithRouter(storeRef.wrapper({ children: <LoginForm /> }), {})

		expect(screen.getAllByText('Login')[0]).toBeInTheDocument()
	})

	it('should throw errors if values in fields are invalid', async () => {
		renderWithRouter(storeRef.wrapper({ children: <LoginForm /> }), {})

		await pressTabTimes(3)

		expect(
			await screen.findByText('Login or email is required')
		).toBeInTheDocument()
		expect(await screen.findByText('Password is required')).toBeInTheDocument()
	})

	it('should authenticate the user when all fields are valid', async () => {
		server.use(
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res.once(ctx.status(401))
			})
		)

		renderWithRouter(
			storeRef.wrapper({
				children: <AppRouter />
			}),
			{ route: '/login' }
		)

		const nameInput = screen.getByLabelText('Name:')
		const passwordInput = screen.getByLabelText('Password:')

		await userEvent.type(nameInput, 'test')
		await userEvent.type(passwordInput, 'testtesttest')

		await userEvent.click(screen.getByRole('button', { name: 'Login' }))

		expect(await screen.findByText('Blogs')).toBeInTheDocument()
		expect(getItemFromLC('accessToken')).toBe(accessToken)
	})
})

const pressTabTimes = async (times: number) => {
	for (let i = 0; i < times; i++) {
		await userEvent.tab()
	}
}
