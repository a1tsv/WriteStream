import { rem } from '@app/styles/mixins'
import { TableHeader } from '@shared/ui/Table'
import styled from 'styled-components'

export const UsersWrapper = styled.div``

export const UsersHeader = styled.div`
	display: flex;
	justify-content: flex-end;

	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const UsersTableHeader = styled(TableHeader).attrs({
	columns: '5',
	maxWidth: '1fr',
	minWidth: '150px'
})``

export const UserHeaderItem = styled.div``
