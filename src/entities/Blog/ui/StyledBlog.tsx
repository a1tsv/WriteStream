import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const BlogWrapper = styled.article`
	display: flex;
	padding: 0.6rem;
	align-items: center;
	margin: 0;
	gap: 0.5rem;

	border-bottom: 1px solid var(--color-light);
`

export const BlogImg = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;

	background: var(--color-secondary);
`

export const BlogBody = styled.div`
	display: flex;
	flex-direction: column;
	//gap: 0.9rem;
`

export const BlogHeading = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;

	&:not(:last-child) {
		margin-bottom: 0.6rem;
	}
`

export const BlogTitle = styled(Typography).attrs({
	variant: 'title',
	as: 'h3'
})`
	font-size: 1.2rem;
	font-weight: 600;
`

export const BlogWebsite = styled.div`
	color: var(--color-light) a {
		color: var(--color-purple);
	}
`

export const BlogText = styled.p``
