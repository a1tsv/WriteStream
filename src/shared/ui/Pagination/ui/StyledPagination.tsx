import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const PaginationWrapper = styled.div`
	display: flex;
	aign-items: center;
	gap: ${rem(8)};
`

export const PaginationList = styled.ul`
	display: flex;
	gap: ${rem(5)};
	align-items: center;
`

export const PaginationItem = styled.li`
	padding: ${rem(5)};
	min-height: 30px;
	min-width: 30px;

	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	cursor: pointer;
	transition: color 0.3s ease-in-out, background 0.3s ease-in-out,
		border 0.3s ease-in-out;

	background: var(--color-main);
	color: var(--color-primary);
	border: 1px solid transparent;

	@media (any-hover: hover) {
		&:hover {
			background: transparent;
			color: var(--color-main);
			border: 1px solid var(--color-main);
		}
	}

	&:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
`
