import {
	DevicesCurrentSession,
	DevicesCurrentSessionTitle,
	DevicesList
} from './StyledDevices'
import { Device, useGetDevicesQuery } from '@entities/Device'
import { NotFound } from '@shared/ui/NotFound'

export const Devices = () => {
	// API calls
	const { data: devices, isLoading: fetchingDevices } = useGetDevicesQuery()

	// Vars
	const isItemsEmpty = !devices?.length && !fetchingDevices
	const userAgent = window.navigator.userAgent
	const currentSession = devices?.find(device => device.title === userAgent)
	const otherSessions = devices?.filter(device => device.title !== userAgent)
	console.log(
		otherSessions,
		devices,
		isItemsEmpty,
		devices?.length,
		fetchingDevices,
		devices?.length && !fetchingDevices
	)

	return (
		<div>
			<DevicesCurrentSession>
				<DevicesCurrentSessionTitle>
					Current session:
				</DevicesCurrentSessionTitle>
				{currentSession ? (
					<Device device={currentSession} />
				) : (
					<div>Loading...</div>
				)}
			</DevicesCurrentSession>
			<DevicesList>
				{fetchingDevices && <div>Loading...</div>}
				{isItemsEmpty ? (
					<NotFound label='No other sessions found 🙂' />
				) : (
					otherSessions?.map(device => (
						<Device key={device.deviceId} device={device} />
					))
				)}
			</DevicesList>
		</div>
	)
}
