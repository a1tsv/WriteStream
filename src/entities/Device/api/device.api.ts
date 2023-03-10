import { IDevice } from '../model'
import { api } from '@shared/api'

export const deviceApi = api.injectEndpoints({
	endpoints: build => ({
		getDevices: build.query<IDevice[], void>({
			query: () => '/security/devices',
			providesTags: ['Devices']
		}),
		terminateDevice: build.mutation<void, string>({
			query: id => ({
				url: `/security/devices/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Devices']
		}),
		terminateAllDevices: build.mutation<void, void>({
			query: () => ({
				url: '/security/devices',
				method: 'DELETE'
			}),
			invalidatesTags: ['Devices']
		})
	})
})

export const {
	useGetDevicesQuery,
	useTerminateAllDevicesMutation,
	useTerminateDeviceMutation
} = deviceApi
