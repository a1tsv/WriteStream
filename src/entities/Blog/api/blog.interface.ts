export interface IBlog {
	id: string
	name: string
	description: string
	websiteUrl: string
	createdAt: string
	isMembership: boolean
}

export interface IBlogRequestModel {
	searchNameTerm: string
	sortBy: string
	sortDirection: string
	pageNumber: number
	pageSize: number
}
