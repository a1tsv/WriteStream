import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const FormCard = styled.div`
	background: var(--color-secondary);
	box-shadow: var(--shadow-sm);
	padding: ${rem(10)} ${rem(15)};
	border-radius: var(--radius);
`
