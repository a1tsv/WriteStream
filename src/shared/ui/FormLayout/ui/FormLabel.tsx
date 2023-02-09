import styled from 'styled-components'

interface IFormLabelProps {
	error?: string
}

export const FormLabel = styled.label<IFormLabelProps>`
	font-size: 1rem;
	display: flex;
	flex-direction: column;

	${({ error }) =>
		error && {
			color: 'var(--color-error)'
		}}
`
