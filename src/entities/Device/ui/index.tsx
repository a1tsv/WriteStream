import { useTerminateDeviceMutation } from '../api'
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
	// Vars
	const { ip, title, lastActiveDate, deviceId } = device

	// API calls
	const [terminate, { isLoading: terminatingSession }] =
		useTerminateDeviceMutation()

	// Handlers
	const terminateSession = () => {
		terminate(deviceId)
	}

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
				<TerminateButton
					onClick={terminateSession}
					disabled={terminatingSession}
				>
					<BiLogOut />
					Terminate
				</TerminateButton>
			</DeviceContent>
		</DeviceWrapper>
	)
}
