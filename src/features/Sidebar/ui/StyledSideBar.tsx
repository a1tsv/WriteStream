import { MenuLink } from '@shared/ui/MenuLink/ui'
import styled from 'styled-components'

interface ISideBarWrapper {
	isOpen: boolean
}

export const SideBarWrapper = styled.aside<ISideBarWrapper>`
	position: fixed;
	top: 0;

	height: 100vh;

	box-shadow: var(--shadow-primary);

	z-index: 50;
	background: var(--color-secondary);

	@media(min-width: 48rem) {
			left: 0;
			width: 2.5rem;
			transition: width 0.3s ease 0s;
			overflow: hidden;

			@media (any-hover: hover) {
				&:hover {
					width: 12.5rem;
				}
			}

	}

	@media(max-width: 48rem) {
			width: 100vw;

			transition: right 0.3s ease 0s;

			right ${({ isOpen }) => (isOpen ? '0' : '-100%')};

	}
		`
export const SideBarNav = styled.nav`
	@media (max-width: 48rem) {
		padding-top: 1.25rem;
	}
`
export const SideBarLink = styled(MenuLink)`
	display: flex;
	align-items: center;
	gap: 0.3125rem;

	svg {
		flex: 0 0 40px;
	}
`
export const SideBarMenu = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.625rem;

	padding: 0.9375rem 0 !important;
`

export const SideBarMenuItem = styled.li``

export const SideBarBurgerButton = styled.button`
	fill: var(--color-purple);
	font-size: 1.25rem;
`
