import { Search } from '@shared/ui/Search'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Search', () => {
	const searchOnChange = jest.fn()

	it('should renders correctly', () => {
		const searchValue = 'Search value'
		render(<Search value={searchValue} onChange={searchOnChange} />)

		expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
	})

	it('should trigger onChange function after input change', () => {
		const searchValue = 'Search value'
		render(<Search value={searchValue} onChange={searchOnChange} />)

		const searchInput = screen.getByPlaceholderText('Search')
		fireEvent.change(searchInput, { target: { value: 'New search value' } })
		expect(searchOnChange).toHaveBeenCalled()
	})
})
