import { Dropdown } from '@shared/ui/Dropdown'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Dropdown', () => {
	const dropdownItems: IDropDownItem[] = [
		{
			title: 'Item 1',
			value: 'item1'
		},
		{
			title: 'Item 2',
			value: 'item2'
		},
		{
			title: 'Item 3',
			value: 'item3'
		}
	]

	const dropdownCallback = jest.fn()
	const selected = 'Item 1'

	it('should render', () => {
		render(
			<Dropdown
				selected={selected}
				onChangeCb={dropdownCallback}
				button={'Label'}
				items={dropdownItems}
			/>
		)
		expect(screen.getByText('Item 1')).toBeInTheDocument()
	})

	it('should render selected item', () => {
		render(
			<Dropdown
				selected={selected}
				onChangeCb={dropdownCallback}
				button={'Label'}
				items={dropdownItems}
			/>
		)

		openDropdown()

		expect(screen.getAllByText(selected)[1]).toHaveStyle({
			background: 'var(--color-purple)',
			color: 'var(--color-secondary)'
		})
	})

	it('should render dropdown items', () => {
		render(
			<Dropdown
				selected={selected}
				onChangeCb={dropdownCallback}
				button={'Label'}
				items={dropdownItems}
			/>
		)

		openDropdown()

		expect(screen.getByText('Item 2')).toBeInTheDocument()
		expect(screen.getByText('Item 3')).toBeInTheDocument()
	})

	it('should trigger callback on item click', () => {
		render(
			<Dropdown
				selected={selected}
				onChangeCb={dropdownCallback}
				button={'Label'}
				items={dropdownItems}
			/>
		)

		openDropdown()

		expect(dropdownCallback).toHaveBeenCalledTimes(0)
		screen.getByText('Item 2').click()
		expect(dropdownCallback).toHaveBeenCalledTimes(1)
		expect(dropdownCallback).toHaveBeenCalledWith('Item 2')
	})
})

const openDropdown = () => {
	const dropdownBtn = screen.getByText('Item 1')
	fireEvent.click(dropdownBtn)
}
