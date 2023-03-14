import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

interface IRatesButtonProps {
	selected: boolean
}

export const RatesWrapper = styled.div`
	display: flex;
	gap: ${rem(10)};
`

export const RatesButton = styled(Button).attrs({
	variant: 'second'
})<IRatesButtonProps>`
	font-size: 20px;
	color: var(--color-main);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${rem(5)};
`

export const RatesText = styled(Typography)`
	font-size: ${rem(14)};
	color: var(--color-main);
`
