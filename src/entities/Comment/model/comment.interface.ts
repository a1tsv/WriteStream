import { TRateStatuses } from '@shared/api/api.interface'

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
		myStatus: TRateStatuses
	}
}
