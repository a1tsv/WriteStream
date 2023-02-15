import { Pagination } from '@shared/ui/Pagination'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Pagination', () => {
	const props = {
		currentPage: 1,
		totalItems: 10,
		itemsPerPage: 5,
		onChange: jest.fn()
	}

	beforeEach(() => {
		jest.resetAllMocks()
	})

	it('renders the correct number of pages when there is no pages before current', () => {
		render(<Pagination {...props} />)
		const pageButtons = screen.getAllByRole('button')

		expect(pageButtons).toHaveLength(4)
	})

	it('render the correct number of pages when there is pages before current', () => {
		render(
			<Pagination {...props} totalItems={10} currentPage={5} itemsPerPage={1} />
		)
		const pageButtons = screen.getAllByRole('button')

		expect(pageButtons).toHaveLength(8)
	})

	it('calls the onChange callback with the correct page when a page button is clicked', () => {
		render(<Pagination {...props} />)
		const pageButton = screen.getByText('2')

		fireEvent.click(pageButton)

		expect(props.onChange).toHaveBeenCalledWith(2)
	})

	it('disables the previous page button when on the first page', () => {
		const { getByRole } = render(<Pagination {...props} currentPage={1} />)
		const prevButton = screen.getByLabelText('Previous page')

		expect(prevButton).toBeDisabled()
	})

	it('disables the next page button when on the last page', () => {
		render(<Pagination {...props} currentPage={1} totalItems={5} />)
		const nextButton = screen.getByLabelText('Next page')

		expect(nextButton).toBeDisabled()
	})
})
