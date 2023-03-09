import { deviceApi } from './device.api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('CommentApi', () => {
	const storeRef = setupApiStore(deviceApi, {})
	const { store, api } = storeRef

	beforeAll(() => {
		fetchMock.enableMocks()
	})

	afterEach(() => {
		fetchMock.resetMocks()
	})

	it('should get comment on successful GET request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}))
		await store.dispatch(api.endpoints.getDevices.initiate())
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/security/devices`)
		expect(method).toBe('GET')
	})

	it('should terminate specified session on successful DELETE request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}))
		await store.dispatch(api.endpoints.terminateDevice.initiate('1'))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/security/devices/1`)
		expect(method).toBe('DELETE')
	})

	it('should terminate all sessions on successful DELETE request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}))
		await store.dispatch(api.endpoints.terminateAllDevices.initiate())
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/security/devices`)
		expect(method).toBe('DELETE')
	})
})
