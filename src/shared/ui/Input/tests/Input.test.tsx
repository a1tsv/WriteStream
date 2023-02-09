import { TextField } from '@shared/ui/Input'
import { render, screen } from '@testing-library/react'

describe('TextField component', () => {
	const inputPlaceholder = 'Input placeholder'

	it('should render', () => {
		render(<TextField placeholder={inputPlaceholder} />)
		expect(screen.getByPlaceholderText(inputPlaceholder)).toBeInTheDocument()
	})

	it('should change tag to textarea if isTextarea prop is true', () => {
		render(<TextField isTextarea placeholder={inputPlaceholder} />)
		expect(screen.getByPlaceholderText(inputPlaceholder).tagName).toBe(
			'TEXTAREA'
		)
	})
})
