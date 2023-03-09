import { IDevice } from '../model'
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
import { FC } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FaFirefoxBrowser } from 'react-icons/fa'

interface IProps {
	device: IDevice
}

export const Device: FC<IProps> = ({ device }) => {
	const { ip, title, lastActiveDate, deviceId } = device

	return (
		<DeviceWrapper>
			<DeviceIcon>
				<FaFirefoxBrowser />
			</DeviceIcon>
			<DeviceContent>
				<DeviceInfo>
					<DeviceName>{title}</DeviceName>
					<DeviceStats>
						<DeviceStat>{ip}</DeviceStat>
						<DeviceStat>Last seen: {lastActiveDate}</DeviceStat>
					</DeviceStats>
				</DeviceInfo>
				<TerminateButton>
					<BiLogOut />
					Terminate
				</TerminateButton>
			</DeviceContent>
		</DeviceWrapper>
	)
}
