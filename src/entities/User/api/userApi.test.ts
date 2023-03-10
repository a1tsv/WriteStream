import { INewPasswordPayload, IRegisterFields } from './../model/user.interface'
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

	beforeEach(() => {
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

	it('should return users on successful GET request', async () => {
		const users = [
			{ id: '1', name: 'User 1', email: '' },
			{ id: '2', name: 'User 2', email: '' }
		]
		fetchMock.mockResponseOnce(JSON.stringify({ data: users }))
		await store.dispatch(api.endpoints.getUsers.initiate({}))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/sa/users?`)
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
		expect(url).toBe(`${baseURL}/sa/users`)
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
		expect(url).toBe(`${baseURL}/sa/users/1`)
		expect(method).toBe('DELETE')
	})

	it('should return a user on successful authMe GET request', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({ data: { id: '1', name: 'User 1', email: '' } })
		)
		await store.dispatch(api.endpoints.authMe.initiate())
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/me`)
		expect(method).toBe('GET')
	})

	it('should register a user on successful register POST request', async () => {
		const registerData: IRegisterFields = {
			login: 'test',
			email: 'test',
			password: 'test'
		}
		fetchMock.mockResponseOnce(JSON.stringify({ data: {} }))

		await store.dispatch(api.endpoints.register.initiate(registerData))

		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls

		expect(url).toBe(`${baseURL}/auth/registration`)
		expect(method).toBe('POST')
	})

	it('should resend verification email on successful resendRegisterEmail POST request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ data: {} }))
		await store.dispatch(
			api.endpoints.resendRegisterEmail.initiate('email@gmail.com')
		)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/registration-email-resending`)
		expect(method).toBe('POST')
	})

	it('should confirm registration on successful registerConfirmation POST request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ data: {} }))
		await store.dispatch(api.endpoints.registerConfirmation.initiate('token'))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/registration-confirmation`)
		expect(method).toBe('POST')
	})

	it('should log out the user on successful logout POST request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ data: {} }))
		await store.dispatch(api.endpoints.logout.initiate())
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/logout`)
		expect(method).toBe('POST')
	})

	it('should send recovery email on successful passwordRecovery POST request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ data: {} }))
		await store.dispatch(
			api.endpoints.passwordRecovery.initiate({ email: 'email@gmail.com' })
		)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/password-recovery`)
		expect(method).toBe('POST')
	})

	it('should set new password on successful logout POST request', async () => {
		const data: INewPasswordPayload = { code: 'code', newPassword: 'test' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: {} }))
		await store.dispatch(api.endpoints.newPassword.initiate(data))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/auth/new-password`)
		expect(method).toBe('POST')
	})
})
