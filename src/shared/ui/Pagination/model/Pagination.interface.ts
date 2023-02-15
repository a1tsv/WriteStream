export interface IPaginationProps {
	currentPage: number
	totalItems: number
	itemsPerPage: number
	onChange: (page: number) => void
}
