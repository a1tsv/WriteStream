export interface IComment {
	id: string
	content: string
	createdAt: string
	commentatorInfo: {
		userLogin: string
		userId: string
	}
}
