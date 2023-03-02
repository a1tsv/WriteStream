import { IComboBoxItem } from '@shared/ui/Combobox/model'

export interface IPost {
	id: string
	title: string
	shortDescription: string
	content: string
	blogId: string
	blogName: string
	createdAt: string
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
