import { userUserApi } from '@entities/User/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('UserApi', () => {
	const storeRef = setupApiStore(userUserApi, {})
	const { store, api } = storeRef

	beforeAll(() => {
		fetchMock.enableMocks()
	})

	afterEach(() => {
		fetchMock.resetMocks()
	})

	it('should authenticate a user on successful POST request', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({ data: { id: '1', name: 'User 1', email: '' } })
		)
		await store.dispatch(
			api.endpoints.login.initiate({
				loginOrEmail: 'User 1',
				password: 'password'
			})
		)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/login`)
		expect(method).toBe('POST')
	})

	it('should return a user on successful authMe GET request', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({ data: { id: '1', name: 'User 1', email: '' } })
		)
		await store.dispatch(api.endpoints.authMe.initiate(''))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/me`)
		expect(method).toBe('GET')
	})
})
