import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const LoginSignUp = styled(NavLink)`
	color: var(--color-main);
	border-bottom: 1px solid var(--color-main);
`

export const LoginOffer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};
	align-items: center;
`

export const LoginForgotPassword = styled(Button).attrs({
	variant: 'semantic',
	type: 'button'
})`
	text-align: right;
	color: var(--color-light);
`
