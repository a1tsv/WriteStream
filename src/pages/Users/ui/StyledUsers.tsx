import { rem } from '@app/styles/mixins'
import { TableHeader, TableLine } from '@shared/ui/Table'
import styled from 'styled-components'

export const UsersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(20)};
`

export const UsersHeader = styled.div`
	display: flex;
	justify-content: flex-end;

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const UsersTableHeader = styled(TableHeader).attrs({})``

export const UsersTableLine = styled(TableLine)``

export const UserHeaderItem = styled.div``

export const UsersTableCell = styled.div`
	&:last-child {
		display: flex;
		justify-content: flex-end;
	}
`
