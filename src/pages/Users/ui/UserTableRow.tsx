import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IUser } from '@entities/User'
import { tableConfig } from '@pages/Users/model'
import { UsersTableCell } from '@pages/Users/ui/StyledUsers'
import { Button } from '@shared/ui/Button'
import { TableLine } from '@shared/ui/Table'
import { formatData } from '@shared/utils/formatData'
import { FC } from 'react'
import { AiFillDelete } from 'react-icons/ai'

interface IUserTableRowProps {
	user: IUser
}

export const UserTableRow: FC<IUserTableRowProps> = ({ user }) => {
	const { showModal } = useModalContext()
	const { id, login, email, createdAt } = user

	const deleteUserHandler = () => {
		showModal(ModalsEnum.DELETE_USER, true, { user })
	}

	return (
		<TableLine {...tableConfig}>
			<UsersTableCell>{login}</UsersTableCell>
			<UsersTableCell>{email}</UsersTableCell>
			<UsersTableCell>{id}</UsersTableCell>
			<UsersTableCell>{formatData(createdAt)}</UsersTableCell>
			<UsersTableCell>
				<Button variant={'secondary'} onClick={deleteUserHandler}>
					<AiFillDelete />
				</Button>
			</UsersTableCell>
		</TableLine>
	)
}
