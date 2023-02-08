import { fzRem } from '@app/styles'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const MenuLink = styled(NavLink)`
	${fzRem(16)}
	display: flex;
	align-items: center;
	gap: 0.3125rem;

	border-right: 0.125rem solid transparent;

	&.active {
		color: var(--color-main);
		fill: var(--color-main);
		border-color: var(--color-main);
	}

	@media (any-hover: hover) {
		&:hover {
			color: var(--color-main);
			fill: var(--color-main);
			border-color: var(--color-main);
		}
	}

	transition: color 0.3s ease 0s, fill 0.3s ease 0s, border-right 0.3s ease 0s;
`
