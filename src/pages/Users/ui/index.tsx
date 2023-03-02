import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { useGetUsersQuery } from '@entities/User'
import { FilterPagination } from '@features/FilterPagination'
import { dropdownItems } from '@pages/Users/model'
import { UsersHeader, UsersWrapper } from '@pages/Users/ui/StyledUsers'
import { UserTableRow } from '@pages/Users/ui/UserTableRow'
import { UserTableSkeleton } from '@pages/Users/ui/UserTableSkeleton'
import { UsersTableInfo } from '@pages/Users/ui/UsersTableInfo'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { Button } from '@shared/ui/Button'
import { NotFound } from '@shared/ui/NotFound'
import { TableBody, TableWrapper } from '@shared/ui/Table'
import { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const UsersPage: FC = () => {
	// Params
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])

	// Modal
	const { showModal } = useModalContext()

	// Vars
	const breadcrumbs: IBreadCrumbsItem[] = [{ title: 'Users', tag: 'h1' }]

	// Api requests
	const { data, isLoading } = useGetUsersQuery(params)
	const isItemsEmpty = !data?.items.length && !isLoading
	const { totalCount, page, pageSize } = data || {}

	// Utils

	const showAddUserModal = () => {
		showModal(ModalsEnum.ADD_USER, true, {})
	}

	const changePage = (page: number) => {
		setSearchParams({ ...params, pageNumber: page.toString() })
	}

	const changePageSize = (pageSize: string) => {
		setSearchParams({ ...params, pageSize })
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
						<NotFound label={'Users not found 😔'} />
					) : (
						<TableBody>
							{isLoading && <UserTableSkeleton count={10} />}
							{data?.items.map(user => (
								<UserTableRow key={user.id} user={user} />
							))}
						</TableBody>
					)}
				</TableWrapper>
				{data?.items.length && (
					<FilterPagination
						currentPage={page || 0}
						totalItems={totalCount || 0}
						itemsPerPage={pageSize || 0}
						onChange={changePage}
						onChangeCb={changePageSize}
						items={dropdownItems}
						selected={pageSize ? `${pageSize}` : dropdownItems[0].value}
					/>
				)}
			</UsersWrapper>
		</div>
	)
}
