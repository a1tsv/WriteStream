import { Button } from '@shared/ui/Button'
import {
	PaginationItem,
	PaginationList,
	PaginationWrapper
} from '@shared/ui/Pagination/ui/StyledPagination'
import { FC } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

interface IPaginationProps {
	currentPage: number
	total: number
	itemsPerPage: number
	onChange: (page: number) => void
}

export const Pagination: FC<IPaginationProps> = ({
	currentPage,
	itemsPerPage,
	onChange,
	total
}) => {
	// Pages logic
	const numberOfPages = Math.ceil(total / itemsPerPage)
	const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1)
	const pagesAroundCurrent = 3
	const pagesBeforeCurrentPage =
		currentPage - pagesAroundCurrent >= 0 ? currentPage - pagesAroundCurrent : 0
	const pagesAfterCurrentPage = currentPage + 3
	const pagesToShow = [
		...pages.slice(pagesBeforeCurrentPage, currentPage),
		...pages.slice(currentPage, pagesAfterCurrentPage)
	]

	// Utils
	const isLastPage = currentPage === numberOfPages
	const isFirstPage = currentPage === 1

	// Handlers
	const handleNextPage = () => {
		if (isLastPage) return
		onChange(currentPage + 1)
	}

	const handlePreviousPage = () => {
		if (isFirstPage) return
		onChange(currentPage - 1)
	}

	return (
		<PaginationWrapper>
			<Button
				variant={'secondary'}
				onClick={handlePreviousPage}
				disabled={isFirstPage}
			>
				<BsChevronLeft />
			</Button>
			<PaginationList>
				{pagesToShow.map(page => (
					<PaginationItem key={page}>
						<button
							type='button'
							onClick={() => onChange(page)}
							disabled={currentPage === page}
						>
							{page}
						</button>
					</PaginationItem>
				))}
			</PaginationList>
			<Button
				variant={'secondary'}
				onClick={handleNextPage}
				disabled={isLastPage}
			>
				<BsChevronRight />
			</Button>
		</PaginationWrapper>
	)
}
