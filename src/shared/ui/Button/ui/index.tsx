import { SxComponent } from '@shared/types'
import styled, { css } from 'styled-components'

interface IButtonProps {
	variant: 'primary' | 'secondary'
}

export const Button = styled.button<SxComponent<IButtonProps>>`
	cursor: pointer;
	padding: 0.5rem 1rem;
	border-radius: var(--radius);
	border: 1px solid transparent;
	${({ variant }) =>
		variant === 'primary'
			? css`
					color: #000;
					background-color: var(--color-main);

					@media (any-hover: hover) {
						&:hover {
							background-color: transparent;
							color: var(--color-main);
							border-color: var(--color-main);
						}
					}
			  `
			: css`
					color: var(--color-main);
					background-color: transparent;
			  `}

	transition: background-color 0.3s ease-in 0s, color 0.3s ease-in 0s;

	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	${({ sx }) => sx}
`
