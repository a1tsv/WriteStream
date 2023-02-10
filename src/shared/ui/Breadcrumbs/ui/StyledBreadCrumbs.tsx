import { rem } from '@app/styles/mixins'
import styled, { css } from 'styled-components'

interface IBreadCrumbsItemProps {
	first?: boolean
}

export const BreadCrumbsItems = styled.ul`
	display: flex;
	align-items: center;
	gap: ${rem(5)};
`

export const BreadCrumbsItem = styled.li<IBreadCrumbsItemProps>`
	font-size: ${rem(14)};
	font-weight: 500;

	${({ first }) =>
		first &&
		css`
			font-weight: 700;
			font-size: ${rem(25)};
		`}
`
