import { rem } from '@app/styles/mixins'
import { Container } from '@shared/ui/Container'
import styled from 'styled-components'

export const MainWrapper = styled.main`
	padding-top: 3rem;
`
export const LayoutContainer = styled(Container).attrs({
	padding: '0 3.75rem',
	big: true
})`
	@media (max-width: 48rem) {
		padding: 0 ${rem(15)};
	}
`
