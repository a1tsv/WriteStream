import styled, { css } from 'styled-components'

interface IButtonProps {
	variant: 'primary' | 'secondary'
}

export const Button = styled.button<IButtonProps>`
	cursor: pointer;
	padding: 0.5rem 1rem;
	border-radius: var(--radius);
	border: 1px solid transparent;
	${({ variant }) =>
		variant === 'primary'
			? css`
					color: var(--color-primary);
					background-color: var(--color-purple);

					@media (any-hover: hover) {
						&:hover {
							background-color: transparent;
							color: var(--color-purple);
							border-color: var(--color-purple);
						}
					}
			  `
			: css`
					color: var(--color-purple);
					background-color: transparent;
			  `}

	transition: background-color 0.3s ease-in 0s, color 0.3s ease-in 0s;
`
