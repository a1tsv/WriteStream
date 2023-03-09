import {
	DevicesCurrentSession,
	DevicesCurrentSessionTitle,
	DevicesList
} from './StyledDevices'
import { Device, useGetDevicesQuery } from '@entities/Device'
import { useAuthMeQuery } from '@entities/User'
import { NotFound } from '@shared/ui/NotFound'
import { Typography } from '@shared/ui/Typography'

export const Devices = () => {
	// API calls
	const { data: devices, isLoading: fetchingDevices } = useGetDevicesQuery()
	const { data: userData, isLoading: fetchingAuthMe } = useAuthMeQuery()

	console.log(userData)

	// Vars
	const isItemsEmpty = !devices?.length && !fetchingDevices
	const currentSessionIsReady = devices?.length && !fetchingAuthMe

	return (
		<div>
			<DevicesCurrentSession>
				<DevicesCurrentSessionTitle>
					Current session:
				</DevicesCurrentSessionTitle>
				{currentSessionIsReady ? (
					<Device device={devices[0]} />
				) : (
					<div>Loading...</div>
				)}
			</DevicesCurrentSession>
			<DevicesList>
				{fetchingDevices && <div>Loading...</div>}
				{isItemsEmpty ? (
					<NotFound label='No other sessions found 🙂' />
				) : (
					devices?.map(device => (
						<Device key={device.deviceId} device={device} />
					))
				)}
			</DevicesList>
		</div>
	)
}
