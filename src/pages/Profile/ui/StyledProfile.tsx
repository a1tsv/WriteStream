import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const ProfileTitle = styled(Typography).attrs({
	variant: 'title'
})`
	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const ProfileLogout = styled(Button).attrs({
	variant: 'primary'
})`
	align-self: flex-end;

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`
