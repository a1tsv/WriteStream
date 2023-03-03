import { rem } from '@app/styles/mixins'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const LoginFormWrapper = styled.div`
	background: var(--color-secondary);
	box-shadow: var(--shadow-sm);
	padding: ${rem(10)} ${rem(15)};
	border-radius: var(--radius);
`

export const LoginSignUp = styled(NavLink)`
	color: var(--color-main);
	border-bottom: 1px solid var(--color-main);
`

export const LoginFields = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const LoginOffer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};
	align-items: center;
`
export const LoginShowPassword = styled.div`
	display: flex;
	gap: ${rem(5)};
	align-items: center;
`
