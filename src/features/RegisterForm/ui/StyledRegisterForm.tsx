import { rem } from '@app/styles/mixins'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const RegisterOffer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};
	align-items: center;
`
export const RegisterSignIn = styled(NavLink)`
	color: var(--color-main);
	border-bottom: 1px solid var(--color-main);
`
