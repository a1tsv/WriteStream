import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const LoginFormWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;

	@media (max-width: ${rem(768)}) {
		grid-template-columns: 1fr;
	}
`

export const LoginImg = styled.div`
	@media (max-width: ${rem(768)}) {
		display: none;
	}
`
