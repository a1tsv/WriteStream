import { tableConfig } from '@pages/Users/model'
import { UsersTableCell } from '@pages/Users/ui/StyledUsers'
import { ISkeletonProps } from '@shared/types'
import { TableLine } from '@shared/ui/Table'
import { getArrayFromLength } from '@shared/utils/getArrayFromLength'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

export const UserTableSkeleton: FC<ISkeletonProps> = ({ count }) => {
	const countArray = getArrayFromLength(count)

	return (
		<>
			{countArray.map((_, i) => (
				<TableLine key={i} {...tableConfig}>
					<UsersTableCell>
						<Skeleton />
					</UsersTableCell>
					<UsersTableCell>
						<Skeleton />
					</UsersTableCell>
					<UsersTableCell>
						<Skeleton />
					</UsersTableCell>
					<UsersTableCell>
						<Skeleton />
					</UsersTableCell>
					<UsersTableCell>
						<Skeleton width={'30px'} height={'30px'} />
					</UsersTableCell>
				</TableLine>
			))}
		</>
	)
}
