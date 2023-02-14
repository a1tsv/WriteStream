import { ITableSizes } from '@shared/ui/Table/model'
import styled from 'styled-components'

export const TableLine = styled.div<ITableSizes>`
	display: grid;
	grid-template-columns: ${({ columns, maxWidth, minWidth }) =>
		`repeat(${columns}, minmax(${minWidth}, ${maxWidth}))`};
	grid-gap: 0 1rem;
	padding: 0.5rem 1rem;

	border-bottom: 1px solid var(--color-main);
`
