import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const DevicesList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

export const DevicesCurrentSessionTitle = styled(Typography).attrs({
	variant: 'sub-title-md'
})`
	&:not(:last-child) {
		margin-bottom: 1rem;
	}
`

export const DevicesCurrentSession = styled.div`
	border-bottom: 1px solid var(--color-light);
	padding-bottom: ${rem(10)};

	&:not(:last-child) {
		margin-bottom: 2rem;
	}
`
export const DevicesTerminateAllSessions = styled(Button).attrs({
	variant: 'primary'
})`
	&:not(:last-child) {
		margin-bottom: 2rem;
	}
`
