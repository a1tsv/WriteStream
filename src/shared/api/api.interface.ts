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

export interface IError {
	message: string
	field: string
}

export type TRateStatuses = 'Like' | 'Dislike' | 'None'

export interface IRatePayload {
	id: string
	likeStatus: TRateStatuses
}
