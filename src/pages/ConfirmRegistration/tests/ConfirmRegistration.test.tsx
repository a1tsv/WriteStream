import { ConfgirmRegistration } from '../ui'
import { api } from '@shared/api'
import { getItemFromLC, setItemToLC } from '@shared/utils/localStorage'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'

jest.mock('@shared/utils/localStorage', () => ({
	...jest.requireActual('@shared/utils/localStorage'),
	getItemFromLC: jest.fn()
}))
const mockedGetItemFromLC = getItemFromLC as jest.Mock

describe('ConfirmRegistration', () => {
	const storeRef = setupApiStore(api, {})

	function renderConfirmPageWithBlogs(intitialRoute?: string) {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<>
						<Routes>
							<Route path='/blogs' element={<div>Blogs page</div>} />
						</Routes>
						<ConfgirmRegistration />
					</>
				)
			}),
			{ route: '/confirm-registration?code=123' }
		)
	}

	it('should redirect to blogs page if there is no code in params', async () => {
		setItemToLC('email', 'test@gmail.com')
		renderConfirmPageWithBlogs()

		expect(mockedGetItemFromLC).toHaveBeenCalledWith('email')
		expect(await screen.findByText('Blogs page')).toBeInTheDocument()
	})

	it('should redirect to blogs page if there is no email in local storage', async () => {
		renderConfirmPageWithBlogs('?code=123')
		expect(await screen.findByText('Blogs page')).toBeInTheDocument()
	})
})
