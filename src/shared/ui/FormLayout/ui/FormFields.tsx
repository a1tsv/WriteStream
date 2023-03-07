import { rem } from '@app/styles/mixins'
import styled, { css } from 'styled-components'

interface IFormFields {
	offset: number
}

export const FormFields = styled.div<IFormFields>`
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};

	${({ offset }) =>
		offset &&
		css`
	&:not(:last-child) {
		margin-bottom: rem(offset);
	`}
`
