import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const ForgotPasswordTitle = styled(Typography)`
	&:not(:first-child) {
		margin-bottom: ${rem(20)};
	}
`
export const ForgotPasswordInfo = styled(Typography)`
	color: var(--color-light);

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const ForgotPasswordBackTo = styled(NavLink)`
	color: var(--color-light);
	border: 1px solid var(--color-light);
`
