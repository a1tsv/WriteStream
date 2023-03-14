export type TCommentRateStatuses = 'Like' | 'Dislike' | 'None'

export interface IComment {
	id: string
	content: string
	createdAt: string
	commentatorInfo: {
		userLogin: string
		userId: string
	}
	likesInfo: {
		likesCount: number
		dislikesCount: number
		myStatus: TCommentRateStatuses
	}
}

export interface IRatePayload {
	id: string
	likeStatus: TCommentRateStatuses
}
