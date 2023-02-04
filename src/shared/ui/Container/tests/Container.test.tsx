import { Container } from '../ui'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Container component', () => {
	it('renders with default props', () => {
		const containerText = 'Container'
		render(<Container padding='1rem'>{containerText}</Container>)
		const container = screen.getByText(containerText)
		expect(container).toHaveStyle(`max-width: 68rem`)
		expect(container).toHaveStyle(`padding: 1rem`)
	})

	it('renders with big prop', () => {
		const containerText = 'Container'
		render(
			<Container padding='1rem' big>
				{containerText}
			</Container>
		)
		const container = screen.getByText(containerText)
		expect(container).toHaveStyle(`max-width: 75rem`)
		expect(container).toHaveStyle(`padding: 1rem`)
	})
})
