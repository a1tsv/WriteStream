import { ConfgirmRegistration } from '../ui'
import { server } from '@app/tests/msw'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setItemToLC } from '@shared/utils/localStorage'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { Route, Routes } from 'react-router-dom'

describe('ConfirmRegistration', () => {
	const storeRef = setupApiStore(api, {})

	const renderConfirnRegisterWithBlogs = (initialRoute?: string) => {
		const baseURL = '/confirm-registration'

		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<Routes>
							<Route path='/blogs' element={<div>Blogs page</div>} />
							<Route path='/email-resend' element={<div>Resend</div>} />
							<Route path='/email-verified' element={<div>Verified</div>} />
							<Route
								path='/confirm-registration'
								element={<ConfgirmRegistration />}
							/>
						</Routes>
					</>
				)
			}),
			{ route: initialRoute ? `${baseURL}${initialRoute}` : baseURL }
		)
	}

	beforeEach(() => {
		localStorage.clear()

		server.use(
			rest.post(
				`${baseURL}/auth/registration-confirmation`,
				(req, res, ctx) => {
					return res(ctx.json({}))
				}
			)
		)
	})

	it('should redirect to blogs page if there is no email in local storage', async () => {
		renderConfirnRegisterWithBlogs('?code=123')
		expect(await screen.findByText('Blogs page')).toBeInTheDocument()
	})

	it('should redirect to blogs page if there is no code in params', async () => {
		setItemToLC('email', 'test@gmail.com')
		renderConfirnRegisterWithBlogs()

		expect(await screen.findByText('Blogs page')).toBeInTheDocument()
	})

	it('should redirect user to email verified page if email and code is valid and request is successful', async () => {
		setItemToLC('email', 'test@gmail.com')
		renderConfirnRegisterWithBlogs('?code=123')

		expect(await screen.findByText('Verified')).toBeInTheDocument()
	})

	it('should redirect user to resend email page if email and code is valid but request is failing', async () => {
		server.use(
			rest.get(`${baseURL}/auth/registration-confirmation`, (req, res, ctx) => {
				return res.once(ctx.status(401))
			})
		)

		setItemToLC('email', 'test@gmail.com')
		renderConfirnRegisterWithBlogs('?code=123')

		expect(await screen.findByText('Resend')).toBeInTheDocument()
	})
})
