import { Pagination } from '@shared/ui/Pagination'
import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

export default {
	title: 'Pagination',
	component: Pagination
} as ComponentMeta<typeof Pagination>

export const Default = () => {
	const totalItems = 100
	const itemsPerPage = 1
	const [currentPage, setCurrentPage] = useState(1)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<Pagination
			currentPage={currentPage}
			totalItems={totalItems}
			itemsPerPage={itemsPerPage}
			onChange={handlePageChange}
		/>
	)
}
