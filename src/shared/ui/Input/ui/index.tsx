import { rem } from '@app/styles/mixins'
import { SxComponent } from '@shared/types'
import styled, { css } from 'styled-components'

interface ITextFieldProps {
	isTextarea?: boolean
}

export const TextField = styled.input.attrs<SxComponent<ITextFieldProps>>(
	({ isTextarea }) => ({
		as: isTextarea ? 'textarea' : 'input'
	})
)<SxComponent<ITextFieldProps>>`
	padding: ${rem(5)} ${rem(10)};
	border: 0 solid transparent;
	border-bottom: 1px solid var(--color-light);
	background: none;
	outline: none;
	color: var(--color-primary);
	transition: border-color 0.3s ease-in 0s;

	${({ isTextarea }) =>
		isTextarea &&
		css`
			resize: none;
			border: 1px solid var(--color-light);
			border-radius: var(--radius);
		`}
	&:focus {
		border-color: var(--color-main);
	}

	${({ sx }) => sx}
`
