import { CurrentSessionContent } from './CurrentSessionContent'
import {
	DevicesCurrentSession,
	DevicesCurrentSessionTitle,
	DevicesList,
	DevicesTerminateAllSessions
} from './StyledDevices'
import {
	Device,
	DeviceSkeleton,
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
	const isCurrentSessionReady = currentSession && !fetchingDevices

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
				{fetchingDevices ? (
					<DeviceSkeleton count={1} />
				) : (
					<CurrentSessionContent
						isCurrentSessionReady={!!isCurrentSessionReady}
						device={currentSession}
					/>
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
				{fetchingDevices && <DeviceSkeleton count={3} />}
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
