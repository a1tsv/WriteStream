import { IGetItemsModel } from '@shared/api/api.interface'

export interface IBlog {
	id: string
	name: string
	description: string
	websiteUrl: string
	createdAt: string
	isMembership: boolean
}

export interface IBlogRequestModel extends IGetItemsModel {
	searchNameTerm: string
}
