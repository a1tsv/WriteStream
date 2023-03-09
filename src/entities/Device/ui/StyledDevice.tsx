import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const DeviceWrapper = styled.div`
	display: flex;
	gap: ${rem(20)};
	align-items: center;
	background: var(--color-bg);
	border: 1px solid var(--color-main);
	padding: ${rem(10)} ${rem(15)};
`

export const DeviceIcon = styled.div`
	flex: 0 0 40px;
`

export const DeviceContent = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: ${rem(10)};
`

export const DeviceInfo = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};
`

export const DeviceName = styled(Typography).attrs({
	variant: 'sub-title-md'
})`
	&:not(:last-child) {
		margin-bottom: ${rem(10)};
	}
`

export const DeviceStats = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(2)};
`

export const DeviceStat = styled(Typography).attrs({
	variant: 'sub-title-sm'
})`
	color: var(--color-gray);
`

export const TerminateButton = styled(Button).attrs({
	variant: 'secondary'
})`
	font-weight: var(--fw-bold);
	display: flex;
	gap: ${rem(5)};
`
