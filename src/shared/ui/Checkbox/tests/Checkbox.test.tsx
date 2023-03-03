import { CheckBox } from '../ui'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('CheckBox', () => {
	it('renders a checkbox button', () => {
		render(
			<CheckBox checked={false} onChange={() => void 0}>
				Checkbox Label
			</CheckBox>
		)
		const checkboxButton = screen.getByRole('switch')
		expect(checkboxButton).toBeInTheDocument()
	})

	it('displays the checkbox label', () => {
		render(
			<CheckBox checked={false} onChange={() => void 0}>
				Checkbox Label
			</CheckBox>
		)
		const checkboxLabel = screen.getByText('Checkbox Label')
		expect(checkboxLabel).toBeInTheDocument()
	})

	it('marks the checkbox as checked when clicked', async () => {
		const handleChange = jest.fn()
		render(
			<CheckBox checked={false} onChange={handleChange}>
				Checkbox Label
			</CheckBox>
		)
		const checkboxButton = screen.getByRole('switch')
		await userEvent.click(checkboxButton)
		expect(handleChange).toHaveBeenCalled()
	})
})
