import { server } from '@app/tests/msw'
import { adminAPI } from '@shared/api'
import { setupApiStore } from '@shared/utils/setupApiStore'
import '@testing-library/jest-dom'
import 'intersection-observer'
import 'whatwg-fetch'

const storeRef = setupApiStore(adminAPI, {})

beforeAll(() => {
	server.listen()
})

afterEach(() => {
	server.resetHandlers()
	storeRef.store.dispatch(adminAPI.util.resetApiState())
})

afterAll(() => server.close())
