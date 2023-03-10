import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const ForgotPasswordWrapper = styled.div`
	max-width: 400px;
	margin: 0 auto;
`

export const ForgotPasswordContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const ForgotPasswordTitle = styled(Typography).attrs({
	variant: 'title'
})`
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
	border-bottom: 1px solid var(--color-light);
	display: flex;
	justify-content: center;
`
