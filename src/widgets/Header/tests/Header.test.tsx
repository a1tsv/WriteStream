import { getItemFromLC, setItemToLC } from '@shared/utils/localStorage'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@widgets/Header'

jest.mock('@shared/utils/localStorage/localStorage', () => ({
	getItemFromLC: jest.fn(() => 'light'),
	setItemToLC: jest.fn()
}))
const mockedGetItemFromLC = getItemFromLC as jest.Mock
const mockedSetItemToLC = setItemToLC as jest.Mock

describe('Header', () => {
	it('should renders correctly', () => {
		render(<Header sideBarStateChanger={jest.fn()} />)
		expect(
			screen.getByRole('button', { name: /theme switcher/i })
		).toBeInTheDocument()

		expect(screen.getByText('Light')).toBeInTheDocument()
	})

	it('renders correctly with dark theme when saved in local storage', () => {
		mockedGetItemFromLC.mockReturnValueOnce('dark')

		render(<Header sideBarStateChanger={jest.fn()} />)

		expect(screen.getByText('Dark')).toBeInTheDocument()
	})

	it('toggles theme and saves it to local storage on theme switcher click', () => {
		render(<Header sideBarStateChanger={jest.fn()} />)
		const themeSwitcher = screen.getByLabelText('Theme switcher')

		fireEvent.click(themeSwitcher)

		expect(mockedSetItemToLC.mock.calls[0]).toEqual(['theme', 'dark'])

		fireEvent.click(themeSwitcher)

		expect(mockedSetItemToLC.mock.calls[1]).toEqual(['theme', 'light'])
	})
})
