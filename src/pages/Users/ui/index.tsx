import { useGetUsersQuery } from '@entities/User'
import { UsersHeader, UsersWrapper } from '@pages/Users/ui/StyledUsers'
import { UsersTableInfo } from '@pages/Users/ui/UsersTableInfo'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { Button } from '@shared/ui/Button'
import { TableBody, TableWrapper } from '@shared/ui/Table'
import { FC } from 'react'

export const UsersPage: FC = () => {
	// Vars
	const breadcrumbs: IBreadCrumbsItem[] = [{ title: 'Users', tag: 'h1' }]

	// Api requests
	const { data, isLoading } = useGetUsersQuery()

	return (
		<div>
			<BreadCrumbs items={breadcrumbs} />
			<UsersWrapper>
				<UsersHeader>
					<Button variant={'primary'}>Add user</Button>
				</UsersHeader>
				<TableWrapper>
					<UsersTableInfo />
					<TableBody></TableBody>
				</TableWrapper>
			</UsersWrapper>
		</div>
	)
}
