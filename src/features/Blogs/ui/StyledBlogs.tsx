import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const BlogsFilters = styled.div`
	display: flex;
	gap: ${rem(15)};
	flex-wrap: wrap;
	justify-content: center;
`
export const BlogsSearch = styled.div`
	flex: 1;
	min-width: 200px;
`
