import { Button } from '@shared/ui/Button'
import { IPaginationProps } from '@shared/ui/Pagination/model'
import {
	PaginationButton,
	PaginationItem,
	PaginationList,
	PaginationWrapper
} from '@shared/ui/Pagination/ui/StyledPagination'
import { FC } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

export const Pagination: FC<IPaginationProps> = ({
	currentPage,
	itemsPerPage,
	onChange,
	totalItems
}) => {
	// Pages logic
	const numberOfPages = Math.ceil(totalItems / itemsPerPage)
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
				aria-label={'Previous page'}
			>
				<BsChevronLeft />
			</Button>
			<PaginationList>
				{pagesToShow.map(page => (
					<PaginationItem key={page}>
						<PaginationButton
							variant={'secondary'}
							type='button'
							onClick={() => onChange(page)}
							disabled={currentPage === page}
						>
							{page}
						</PaginationButton>
					</PaginationItem>
				))}
			</PaginationList>
			<Button
				variant={'secondary'}
				onClick={handleNextPage}
				disabled={isLastPage}
				aria-label={'Next page'}
			>
				<BsChevronRight />
			</Button>
		</PaginationWrapper>
	)
}
