import { IUser } from '@entities/User'
import { tableConfig } from '@pages/Users/model'
import { UsersTableCell } from '@pages/Users/ui/StyledUsers'
import { TableLine } from '@shared/ui/Table'
import { FC } from 'react'
import { AiFillDelete } from 'react-icons/ai'

interface IUserTableRowProps {
	user: IUser
}

export const UserTableRow: FC<IUserTableRowProps> = ({ user }) => {
	const { id, login, email, createdAt } = user
	return (
		<TableLine {...tableConfig}>
			<UsersTableCell>{id}</UsersTableCell>
			<UsersTableCell>{login}</UsersTableCell>
			<UsersTableCell>{email}</UsersTableCell>
			<UsersTableCell>{createdAt}</UsersTableCell>
			<UsersTableCell>
				<AiFillDelete />
			</UsersTableCell>
		</TableLine>
	)
}
