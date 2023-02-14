import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { useGetUsersQuery } from '@entities/User'
import { UsersHeader, UsersWrapper } from '@pages/Users/ui/StyledUsers'
import { UserTableRow } from '@pages/Users/ui/UserTableRow'
import { UsersTableInfo } from '@pages/Users/ui/UsersTableInfo'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { Button } from '@shared/ui/Button'
import { NotFound } from '@shared/ui/NotFound'
import { TableBody, TableWrapper } from '@shared/ui/Table'
import { FC } from 'react'

export const UsersPage: FC = () => {
	// Modal
	const { showModal } = useModalContext()

	// Vars
	const breadcrumbs: IBreadCrumbsItem[] = [{ title: 'Users', tag: 'h1' }]

	// Api requests
	const { data, isLoading } = useGetUsersQuery()
	const isItemsEmpty = !data?.items.length && !isLoading

	// Utils

	const showAddUserModal = () => {
		showModal(ModalsEnum.ADD_USER, true, {})
	}

	return (
		<div>
			<BreadCrumbs items={breadcrumbs} />
			<UsersWrapper>
				<UsersHeader>
					<Button variant={'primary'} onClick={showAddUserModal}>
						Add user
					</Button>
				</UsersHeader>
				<TableWrapper>
					<UsersTableInfo />
					{isItemsEmpty ? (
						<NotFound label={'Users not found ☹️'} />
					) : (
						<TableBody>
							{data?.items.map(user => (
								<UserTableRow key={user.id} user={user} />
							))}
						</TableBody>
					)}
				</TableWrapper>
			</UsersWrapper>
		</div>
	)
}
