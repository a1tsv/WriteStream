import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const PostBlogTitle = styled(Typography).attrs({
	as: 'h2',
	variant: 'sub-title-md'
})`
	margin-bottom: ${rem(10)};
`

export const PostHeading = styled.div`
	display: flex;
	align-items: center;
	gap: ${rem(5)};

	&:not(:last-child) {
		margin-bottom: ${rem(10)};
	}
`

export const PostTitle = styled(Typography).attrs({
	as: 'h1',
	variant: 'title'
})``

export const PostMembership = styled(Typography).attrs({
	as: 'span',
	variant: 'sub-title-sm'
})`
	color: var(--color-light);
`

export const PostDate = styled(Typography).attrs({
	as: 'span',
	variant: 'sub-title-sm'
})`
	color: var(--color-light);
`

export const PostImg = styled.img`
	width: 100%;
	height: ${rem(400)};
	object-fit: cover;
	background: var(--color-primary);

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const PostText = styled(Typography).attrs({
	as: 'p'
})``
