import {
	getItemFromLC,
	setItemToLC
} from '@shared/utils/localStorage/localStorage'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@widgets/Header'

jest.mock('@shared/utils/localStorage', () => ({
	getItemFromLC: jest.fn(() => 'light'),
	setItemToLC: jest.fn()
}))
describe('Header', () => {
	it('should renders correctly', () => {
		render(<Header sideBarStateChanger={jest.fn()} />)
		expect(
			screen.getByRole('button', { name: /theme switcher/i })
		).toBeInTheDocument()

		expect(screen.getByText('Light')).toBeInTheDocument()
	})

	it('renders correctly with dark theme when saved in local storage', () => {
		(getItemFromLC as jest.Mock).mockReturnValueOnce('dark')

		render(<Header sideBarStateChanger={jest.fn()} />)

		expect(screen.getByText('Dark')).toBeInTheDocument()
	})

	it('toggles theme and saves it to local storage on theme switcher click', () => {
		render(<Header sideBarStateChanger={jest.fn()} />)
		const themeSwitcher = screen.getByLabelText('Theme switcher')

		fireEvent.click(themeSwitcher)

		expect((setItemToLC as jest.Mock).mock.calls[0]).toEqual(['theme', 'dark'])

		fireEvent.click(themeSwitcher)

		expect((setItemToLC as jest.Mock).mock.calls[1]).toEqual(['theme', 'light'])
	})
})
