import { ComboBox } from '@shared/ui/Combobox'
import { IComboBoxItem } from '@shared/ui/Combobox/model'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('ComboBox', () => {
	const items: IComboBoxItem[] = [
		{ id: '1', title: 'Option 1' },
		{ id: '2', title: 'Option 2' },
		{ id: '3', title: 'Option 3' }
	]
	const value = { id: '1', title: 'Option 1' }

	it('should render the component', () => {
		const onChange = jest.fn()

		render(
			<ComboBox
				items={items}
				onChange={onChange}
				value={value}
				query=''
				setQuery={jest.fn()}
			/>
		)

		const input = screen.getByPlaceholderText('Search')

		fireEvent.change(input, { target: { value: 'Option 2' } })
		fireEvent.click(screen.getByText('Option 2'))

		expect(onChange).toHaveBeenCalledWith({ id: '2', title: 'Option 2' })
	})

	it('should display no results found when there are no matching options', () => {
		render(
			<ComboBox
				items={items}
				onChange={jest.fn()}
				value={value}
				query='Option 4'
				setQuery={jest.fn()}
			/>
		)

		const input = screen.getByPlaceholderText('Search')

		fireEvent.change(input, { target: { value: 'Option 4' } })

		expect(screen.getByText('No results found')).toBeInTheDocument()
	})

	it('should display the loader when isLoading is true', () => {
		render(
			<ComboBox
				items={items}
				onChange={jest.fn()}
				value={value}
				query='Option 4'
				setQuery={jest.fn()}
				isLoading={true}
			/>
		)

		const input = screen.getByPlaceholderText('Search')

		fireEvent.change(input, { target: { value: 'Option 4' } })

		expect(screen.getByLabelText('Searching for items')).toBeInTheDocument()
	})

	it('should not display the loader or not results found when passed an empty array', () => {
		render(
			<ComboBox
				items={[]}
				onChange={jest.fn()}
				value={value}
				query=''
				setQuery={jest.fn()}
			/>
		)

		const openButton = screen.getByRole('button')
		fireEvent.click(openButton)
		expect(
			screen.queryByLabelText('Searching for items')
		).not.toBeInTheDocument()
		expect(screen.queryByText('No results found')).not.toBeInTheDocument()
	})
})
