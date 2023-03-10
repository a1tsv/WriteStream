import {
	DeviceContent,
	DeviceIcon,
	DeviceInfo,
	DeviceName,
	DeviceStat,
	DeviceStats,
	DeviceWrapper,
	TerminateButton
} from './StyledDevice'
import { ISkeletonProps } from '@shared/types'
import { getArrayFromLength } from '@shared/utils/getArrayFromLength'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

export const DeviceSkeleton: FC<ISkeletonProps> = ({ count }) => {
	const countArray = getArrayFromLength(count)

	return (
		<>
			{countArray.map((_, i) => (
				<DeviceWrapper key={i}>
					<DeviceIcon>
						<Skeleton width={40} height={40} />
					</DeviceIcon>
					<DeviceContent>
						<DeviceInfo>
							<DeviceName>
								<Skeleton width={300} />
							</DeviceName>
							<DeviceStats>
								<DeviceStat>
									<Skeleton width={150} />
								</DeviceStat>
								<DeviceStat>
									<Skeleton width={150} />
								</DeviceStat>
							</DeviceStats>
						</DeviceInfo>
						<TerminateButton>
							<Skeleton width={125} />
						</TerminateButton>
					</DeviceContent>
				</DeviceWrapper>
			))}
		</>
	)
}
