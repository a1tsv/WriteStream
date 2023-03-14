import { TRateStatuses } from './../../../shared/api/api.interface'
import { IRateUser } from '@shared/api/api.interface'
import { IComboBoxItem } from '@shared/ui/Combobox/model'

export interface IPost {
	id: string
	title: string
	shortDescription: string
	content: string
	blogId: string
	blogName: string
	createdAt: string
	extendedLikesInfo: {
		likesCount: number
		dislikesCount: number
		myStatus: TRateStatuses
		newestLikes: IRateUser[]
	}
}

export type IUpdatePostModel = Omit<IPost, 'blogName' | 'createdAt'>
export type ICreatePostModel = Omit<IUpdatePostModel, 'id'>
export type IDeletePostModel = Pick<IPost, 'id' | 'blogId'>

export interface IUpdatePostFields {
	title: string
	shortDescription: string
	content: string
	blog: IComboBoxItem
}
