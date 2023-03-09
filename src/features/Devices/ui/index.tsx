import {
	useGetDevicesQuery,
	useTerminateDeviceMutation
} from '@entities/Device'

export const Devices = () => {
	// API calls
	const { data: devices, isLoading: fetchingDevices } = useGetDevicesQuery()
	const [terminateSession, { isLoading: terminatingSession }] =
		useTerminateDeviceMutation()

	return <div>Devices</div>
}
