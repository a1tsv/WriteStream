import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const PostsItems = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-gap: 20px;
	margin-top: 20px;
`

export const PostsFilters = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: ${rem(20)};
`
