import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const PostPreviewContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${rem(10)};
`

export const PostPreviewImg = styled.img`
	width: 100%;
	height: 150px;
	object-fit: cover;
	border-radius: ${rem(10)};
	background: var(--color-primary);

	&:not(:last-child) {
		margin-bottom: ${rem(5)};
	}
`

export const PostPreviewBody = styled.div`
	display: flex;
	flex-direction: column;
`

export const PostPreviewTitle = styled(Typography).attrs({
	as: 'h3',
	variant: 'title'
})``

export const PostPreviewText = styled(Typography).attrs({
	as: 'p',
	variant: 'text'
})`
	margin-bottom: ${rem(5)};
`

export const PostPreviewTime = styled(Typography).attrs({
	as: 'p',
	variant: 'text'
})``
