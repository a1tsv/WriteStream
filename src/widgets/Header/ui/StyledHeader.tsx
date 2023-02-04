import { Container } from '@shared/ui/Container'
import styled from 'styled-components'

export const HeaderWrapper = styled.header`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 49;

	@media (max-width: 48rem) {
		z-index: 51;
	}
`

export const HeaderContainer = styled(Container).attrs({
	big: true,
	padding: '0.6rem 0.9rem'
})`
	display: flex;
	justify-content: flex-end;
`

export const HeaderBurgerButton = styled.button`
	cursor: pointer;
	color: var(--color-primary);
	font-size: 1.25rem;

	@media (min-width: 48rem) {
		display: none;
	}
`
export const HeaderThemeSwitcher = styled.button`
	cursor: pointer;
	color: var(--color-primary);
	font-size: 1.25rem;
`
