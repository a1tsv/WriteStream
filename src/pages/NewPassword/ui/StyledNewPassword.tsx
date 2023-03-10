import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const NewPasswordWrapper = styled.div`
	max-width: 400px;
	margin: 0 auto;
`

export const NewPasswordContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const NewPasswordTitle = styled(Typography).attrs({
	variant: 'title'
})`
	&:not(:last-child) {
		margin-bottom: ${rem(10)};
	}
`
