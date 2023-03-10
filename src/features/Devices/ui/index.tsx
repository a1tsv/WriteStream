import {
	DevicesCurrentSession,
	DevicesCurrentSessionTitle,
	DevicesList,
	DevicesTerminateAllSessions
} from './StyledDevices'
import {
	Device,
	useGetDevicesQuery,
	useTerminateAllDevicesMutation
} from '@entities/Device'
import { NotFound } from '@shared/ui/NotFound'

export const Devices = () => {
	// API calls
	const { data: devices, isLoading: fetchingDevices } = useGetDevicesQuery()
	const [terminateAllSessions, { isLoading: terminatingSessions }] =
		useTerminateAllDevicesMutation()

	// Vars
	const userAgent = window.navigator.userAgent
	const currentSession = devices?.find(device => device.title === userAgent)
	const otherSessions = devices?.filter(device => device.title !== userAgent)
	const isItemsEmpty = !otherSessions?.length && !fetchingDevices
	console.log(devices, fetchingDevices)

	// Handlers
	const handleTerminateAllSessions = () => {
		terminateAllSessions()
	}

	return (
		<div>
			<DevicesCurrentSession>
				<DevicesCurrentSessionTitle>
					Current session:
				</DevicesCurrentSessionTitle>
				{currentSession ? (
					<Device isCurrentSession device={currentSession} />
				) : (
					<div>Loading...</div>
				)}
			</DevicesCurrentSession>
			<DevicesTerminateAllSessions
				variant='primary'
				onClick={handleTerminateAllSessions}
				disabled={terminatingSessions}
			>
				Terminate all sessions
			</DevicesTerminateAllSessions>
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
