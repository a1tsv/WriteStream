import { server } from '@app/tests/msw'
import { AddBlogModal } from '@features/AddBlogModal'
import { LoginForm } from '@features/LoginForm'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import { rest } from 'msw'

describe('AddBlogModal', () => {
	const storeRef = setupApiStore(api, {})

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/auth/login`, (req, res, ctx) => {
				return res(ctx.json({}))
			})
		)
	})

	it('renders the login form', () => {
		renderWithRouter(storeRef.wrapper({ children: <LoginForm /> }), {})

		expect(screen.getByText('Login')).toBeInTheDocument()
	})

	// it('should add the blog when all fields are valid', async () => {
	// 	render(
	// 		<Transition show={true}>
	// 			<AddBlogModal />
	// 		</Transition>,
	//
	// 		{ wrapper: storeRef.wrapper }
	// 	)
	//
	// 	const nameInput = screen.getByLabelText('Name:')
	// 	const websiteInput = screen.getByLabelText('Website:')
	// 	const descriptionInput = screen.getByLabelText('Description:')
	//
	// 	await userEvent.type(nameInput, 'Test')
	// 	await userEvent.type(websiteInput, 'https://test.com')
	// 	await userEvent.type(descriptionInput, 'Testtesttest')
	//
	// 	const submitButton = screen.getByText('Submit')
	// 	await userEvent.click(submitButton)
	//
	// 	await waitFor(() => {
	// 		expect(items).toHaveLength(2)
	// 	})
	// })
})
