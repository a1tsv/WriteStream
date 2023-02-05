import { Typography } from '../ui'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Typography', () => {
	it('should render correctly', () => {
		const typographyText = 'Typography text'
		render(<Typography>{typographyText}</Typography>)

		expect(screen.getByText(typographyText)).toBeInTheDocument()
	})
	it('should have correct styles when passed variant "title"', () => {
		const typographyText = 'Typography text'
		render(<Typography variant={'title'}>{typographyText}</Typography>)
		expect(screen.getByText(typographyText)).toHaveStyle({
			color: 'var(--color-primary)',
			textAlign: 'left',
			fontWeight: 'var(--fw-bold)',
			fontSize: 'var(--fs-big)'
		})
	})
	it('should have correct styles when passed variant "sub-title-md"', () => {
		const typographyText = 'Typography text'
		render(<Typography variant={'sub-title-md'}>{typographyText}</Typography>)
		expect(screen.getByText(typographyText)).toHaveStyle({
			color: 'var(--color-primary)',
			textAlign: 'left',
			fontWeight: 'var(--fw-bold)',
			fontSize: 'var(--fs-md)'
		})
	})
	it('should have correct styles when passed variant "sub-title-sm"', () => {
		const typographyText = 'Typography text'
		render(<Typography variant={'sub-title-sm'}>{typographyText}</Typography>)
		expect(screen.getByText(typographyText)).toHaveStyle({
			color: 'var(--color-primary)',
			textAlign: 'left',
			fontWeight: 'var(--fw-sm)',
			fontSize: 'var(--fs-sm)'
		})
	})
})
