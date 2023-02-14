import { ITableSizes } from '@shared/ui/Table/model'
import styled from 'styled-components'

export const TableHeader = styled.div<ITableSizes>`
	display: grid;
	align-items: center;
	grid-template-columns: ${({ columns, maxWidth, minWidth }) =>
		`repeat(${columns}, minmax(${minWidth}, ${maxWidth}))`};
	grid-gap: 0 1rem;
	padding: 0.5rem 1rem;
	background: var(--color-main);
	color: #000;
	width: 100%;
	border-radius: var(--radius);
`
