import { RatesButton, RatesText, RatesWrapper } from './StyledRates'
import { IRateUser, TRateStatuses } from '@shared/api/api.interface'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { TbHeartOff } from 'react-icons/tb'

interface IProps {
	isLoading: boolean
	myStatus: TRateStatuses
	likesCount: number
	dislikesCount: number
	newestLikes: IRateUser[]
	handleRate: (status: TRateStatuses) => void
}

export const Rates: FC<IProps> = ({
	isLoading,
	myStatus,
	likesCount,
	handleRate,
	dislikesCount,
	newestLikes
}) => {
	return (
		<RatesWrapper>
			<RatesButton
				variant={'secondary'}
				disabled={isLoading}
				selected={myStatus === 'Like'}
				aria-label={'Like the comment'}
				onClick={() => handleRate('Like')}
			>
				<AiOutlineHeart />
				<RatesText>{likesCount}</RatesText>
				<RatesText>
					{newestLikes.map(user => user.userLogin).join(', ')}
				</RatesText>
			</RatesButton>
			<RatesButton
				variant={'secondary'}
				disabled={isLoading}
				selected={myStatus === 'Dislike'}
				onClick={() => handleRate('Dislike')}
				aria-label={'Dislike the comment'}
			>
				<TbHeartOff />
				<RatesText>{dislikesCount}</RatesText>
			</RatesButton>
		</RatesWrapper>
	)
}
