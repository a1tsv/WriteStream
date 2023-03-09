import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import styled from 'styled-components'

export const ProfileButtons = styled.div`
	display: flex;
	gap: ${rem(10)};
	flex-wrap: wrap;
	align-self: flex-end;

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const ProfileButton = styled(Button).attrs({
	variant: 'primary'
})`
	display: flex;
	align-items: center;
	gap: ${rem(5)};
`
