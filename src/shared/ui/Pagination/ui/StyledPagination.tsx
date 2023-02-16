import { rem } from '@app/styles/mixins'
import { Button } from '@shared/ui/Button'
import styled from 'styled-components'

export const PaginationWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: ${rem(8)};
`

export const PaginationList = styled.ul`
	display: flex;
	gap: ${rem(5)};
	align-items: center;
`

export const PaginationItem = styled.li`
	&:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
`

export const PaginationButton = styled(Button).attrs({
	variant: 'secondary'
})`
	padding: ${rem(5)} ${rem(4)};
	max-height: 24px;
	min-width: 23px;

	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: var(--radius);
	cursor: pointer;
	transition: color 0.3s ease-in-out, background 0.3s ease-in-out,
		border 0.3s ease-in-out, opacity 0.3s ease-in-out;

	background: var(--color-main);
	color: #000;
	border: 1px solid transparent;

	@media (any-hover: hover) {
		&:hover {
			background: transparent;
			color: var(--color-main);
			border: 1px solid var(--color-main);
		}
	}
`
