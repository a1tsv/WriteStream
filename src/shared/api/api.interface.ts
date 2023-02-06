export interface IGetItemsResponse<D> {
	pagesCount: number
	page: number
	pageSize: number
	totalCount: number
	items: D
}

export interface IGetItemsModel {
	sortBy: string
	sortDirection: string
	pageNumber: number
	pageSize: number
}
