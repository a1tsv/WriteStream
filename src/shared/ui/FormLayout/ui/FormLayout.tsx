import styled from 'styled-components'

interface IProps {
	align?: string
}

export const FormLayout = styled.form<IProps>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
	align-items: ${({ align }) => align || 'stretch'};
`
