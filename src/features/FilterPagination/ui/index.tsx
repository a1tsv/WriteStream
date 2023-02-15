import { FilterPaginationWrapper } from '@features/FilterPagination/ui/StyledFilterPagination'
import { Dropdown } from '@shared/ui/Dropdown'
import { IDropDownProps } from '@shared/ui/Dropdown/model/Dropdown.interface'
import { IPaginationProps, Pagination } from '@shared/ui/Pagination'
import { FC } from 'react'

type IFilterPaginationProps = IPaginationProps & IDropDownProps

export const FilterPagination: FC<IFilterPaginationProps> = ({
	currentPage,
	itemsPerPage,
	totalItems,
	onChange,
	onChangeCb,
	items
}) => {
	return (
		<FilterPaginationWrapper>
			<Pagination
				currentPage={currentPage}
				totalItems={totalItems}
				itemsPerPage={itemsPerPage}
				onChange={onChange}
			/>
			<Dropdown
				select
				onChangeCb={onChangeCb}
				items={items}
				button={'Pagination dropdown'}
			/>
		</FilterPaginationWrapper>
	)
}
