import { MenuLink } from '@shared/ui/MenuLink/ui'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router'
import { MemoryRouter } from 'react-router-dom'

describe('Menu Link', () => {
	it('renders correctly', () => {
		render(
			<MemoryRouter>
				<MenuLink to={'/placeholder'}>Link</MenuLink>
			</MemoryRouter>
		)

		expect(screen.getByText('Link')).toBeInTheDocument()
	})

	it('should redirect to specified URL after click action', async () => {
		const linkURL = '/blogs'
		const pageText = 'Blogs'
		render(
			<MemoryRouter>
				<Routes>
					<Route path={'*'} element={pageText} />
				</Routes>
				<MenuLink to={linkURL}>Link</MenuLink>
			</MemoryRouter>
		)

		const link = screen.getByText('Link')
		await userEvent.click(link)

		expect(screen.getByText(pageText)).toBeInTheDocument()
	})
})
