import { rem } from '@app/styles/mixins'
import { Typography } from '@shared/ui/Typography'
import styled from 'styled-components'

export const BlogsSubTitle = styled(Typography).attrs({
	as: 'h3',
	variant: 'sub-title-md'
})`
	margin-bottom: ${rem(15)};
	color: var(--color-light);
`

export const BlogsFilters = styled.div`
	display: flex;
	gap: ${rem(15)};
	flex-wrap: wrap;
	justify-content: center;

	&:not(:last-child) {
		margin-bottom: ${rem(15)};
	}
`
export const BlogsSearch = styled.div`
	flex: 1;
	min-width: 200px;
`

export const BlogsItems = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(15)};
`
