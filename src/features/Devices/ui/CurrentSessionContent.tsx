import { Device, IDevice } from '@entities/Device'
import { NotFound } from '@shared/ui/NotFound'
import { FC } from 'react'

interface IProps {
	isCurrentSessionReady: boolean
	device: IDevice | undefined
}

export const CurrentSessionContent: FC<IProps> = ({
	isCurrentSessionReady,
	device
}) => {
	return isCurrentSessionReady ? (
		<Device isCurrentSession device={device as IDevice} />
	) : (
		<NotFound label='Something went wrong 😔' />
	)
}
