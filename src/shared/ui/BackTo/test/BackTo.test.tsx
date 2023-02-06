import { BackTo } from '@shared/ui/BackTo'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { fireEvent, screen } from '@storybook/testing-library'
import { Route, Routes } from 'react-router'

describe('Back to', () => {
	it('should render', () => {
		renderWithRouter(<BackTo to='/' text='Back to home' />, {})
		expect(screen.getByText('Back to home')).toBeInTheDocument()
	})

	it('should navigate to the correct page after clicking on the button', () => {
		renderWithRouter(
			<>
				<Routes>
					<Route path={'/'} element={<div>home</div>} />
					<Route path={'/blogs'} element={<div>blogs</div>} />
				</Routes>
				<BackTo to='/blogs' text='Back to blogs' />
			</>,
			{ route: '/' }
		)

		const button = screen.getByRole('button', { name: /back to blogs/i })
		fireEvent.click(button)
		expect(screen.getByText('blogs')).toBeInTheDocument()
	})
})
