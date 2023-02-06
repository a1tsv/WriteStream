import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const StyledBlogItems = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-gap: 20px;
	margin-top: 20px;
`

export const StyledBlogWrapper = styled.div`
	margin-bottom: ${rem(20)};
`
