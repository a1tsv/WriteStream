import { NotFound } from '@shared/ui/NotFound'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router'

describe('NotFound component', () => {
	it('renders label correctly', () => {
		const label = 'Page Not Found'
		renderWithRouter(<NotFound label={label} />, {})
		expect(screen.getByText(label)).toBeInTheDocument()
	})

	it('renders fallback link correctly', () => {
		const label = 'Page Not Found'
		const fallback = '/'
		renderWithRouter(<NotFound label={label} fallback={fallback} />, {})
		expect(screen.getByText('Go back')).toBeInTheDocument()
	})

	it('should redirect to fallback page', async () => {
		const label = 'Page Not Found'
		const fallback = '/'
		renderWithRouter(
			<>
				<Routes>
					<Route path={fallback} element={<div>Home</div>} />
				</Routes>
				<NotFound label={label} fallback={fallback} />
			</>,
			{ route: '/not-found' }
		)
		expect(screen.getByText(label)).toBeInTheDocument()
		await userEvent.click(screen.getByText('Go back'))
		expect(screen.getByText('Home')).toBeInTheDocument()
	})

	it('does not render fallback link if fallback is not provided', () => {
		const label = 'Page Not Found'
		renderWithRouter(<NotFound label={label} />, {})
		expect(screen.queryByText('Go back')).toBeNull()
	})
})
