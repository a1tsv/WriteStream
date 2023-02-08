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
export type IUpdatePostFields = Omit<IUpdatePostModel, 'id'>
