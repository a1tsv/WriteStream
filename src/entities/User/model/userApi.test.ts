import { userApi } from '@entities/User'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('UserApi', () => {
	const storeRef = setupApiStore(userApi, {})
	const { store, api } = storeRef

	beforeAll(() => {
		fetchMock.enableMocks()
	})

	afterEach(() => {
		fetchMock.resetMocks()
	})

	it('should return users on successful GET request', async () => {
		const users = [
			{ id: '1', name: 'User 1', email: '' },
			{ id: '2', name: 'User 2', email: '' }
		]
		fetchMock.mockResponseOnce(JSON.stringify({ data: users }))
		await store.dispatch(api.endpoints.getUsers.initiate())
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/users`)
		expect(method).toBe('GET')
	})

	it('should create a user on successful POST request', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({ data: { id: '1', name: 'User 1', email: '' } })
		)
		await store.dispatch(
			api.endpoints.createUser.initiate({
				login: 'User 1',
				email: 'email@gmail.com',
				password: 'password'
			})
		)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/users`)
		expect(method).toBe('POST')
	})

	it('should delete a user on successful DELETE request', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({ data: { id: '1', name: 'User 1', email: '' } })
		)
		await store.dispatch(api.endpoints.deleteUser.initiate('1'))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/users/1`)
		expect(method).toBe('DELETE')
	})
})
