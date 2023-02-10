import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import styled, { css } from 'styled-components'

interface IBlogWrapperProps {
	singleBlog?: boolean
}

interface IBlogTextProps {
	collapsed: boolean
	initialHeight?: number
}

interface IBlogShowMoreProps {
	collapsed: boolean
}

export const BlogWrapper = styled.article<IBlogWrapperProps>`
	display: flex;
	padding: 0.6rem;
	margin: 0;
	gap: 0.5rem;
	align-items: flex-start;
	background: var(--color-bg);
	border-radius: 0.7rem;

	${({ singleBlog }) =>
		singleBlog &&
		css`
			flex-direction: column;

			img {
				height: 300px;
				width: 100%;
			}

			span {
				flex: 0 1 300px;
				width: 100%;
			}
		`}

	@media (max-width: 48rem) {
		flex-direction: column;
	}
`

export const BlogImg = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 0.7rem;
	border: none;

	background: var(--color-secondary);
`

export const BlogImgPlaceholder = styled.span`
	flex: 0 0 100px;
	width: 100px;
	height: 100px;
	border-radius: 0.7rem;
	border: none;
	background: var(--color-main);
`

export const BlogBody = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	//gap: 0.9rem;
`

export const BlogHeading = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0.4rem;

	&:not(:last-child) {
		margin-bottom: 0.6rem;
	}
`

export const BlogHeadingInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
`

export const BlogTitle = styled(Typography).attrs({
	variant: 'title',
	as: 'h3'
})`
	font-size: 1.2rem;
	font-weight: 600;
`

export const BlogWebsite = styled.div`
	color: var(--color-light);

	& a {
		color: var(--color-main);
	}
`

export const BlogText = styled.p<IBlogTextProps>`
	position: relative;
	transition: height 0.15s ease-in 0s;
	overflow: hidden;

	${({ collapsed, initialHeight }) =>
		css`
			height: ${collapsed
				? rem(50)
				: (initialHeight && rem(initialHeight)) || 'auto'};

			${collapsed &&
			css`
				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					right: 0;
					width: 100%;
					height: 100%;
					z-index: 3;
					background: var(--gradient-hiding);
				}
			`}
		`}
`

export const BlogShowMore = styled.button<IBlogShowMoreProps>`
	display: flex;
	align-items: center;
	color: var(--color-light);
	cursor: pointer;
	gap: ${rem(5)};
	transition: background 0.15s ease-in 0s;

	svg {
		transition: all 0.2s ease-in 0s;
		${({ collapsed }) => collapsed && 'transform: rotate(180deg);'}
	}
`
