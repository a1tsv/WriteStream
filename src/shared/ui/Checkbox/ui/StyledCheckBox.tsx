import { rem } from '@app/styles/mixins'
import styled, { css } from 'styled-components'

interface ICheckBoxButtonProps {
	checked: boolean
}

export const CheckBoxButton = styled.button<ICheckBoxButtonProps>`
	display: flex;
	gap: ${rem(5)};

	&:before {
		content: '';
		border-radius: var(--radius);
		border: 1px solid var(--color-main);
		background: ${({ checked }) =>
			checked ? 'var(--color-main)' : 'transparent'};

		flex: 0 0 1.2rem;
		width: 1.2rem;
		height: 1.2rem;

		transition: background 0.1s ease-in 0s;
	}
`
