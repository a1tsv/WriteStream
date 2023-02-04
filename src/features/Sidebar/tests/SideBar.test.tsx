import { SideBar } from '@features/Sidebar'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

describe('Sidebar', () => {
	it('should renders correctly', () => {
		render(
			<MemoryRouter>
				<SideBar isOpen={false} />
			</MemoryRouter>
		)
		const sidebar = screen.getByRole('complementary')
	})

	it('should display menu items', () => {
		render(
			<MemoryRouter>
				<SideBar isOpen={false} />
			</MemoryRouter>
		)
		expect(screen.getByText('Blogs')).toBeInTheDocument()
	})
})
