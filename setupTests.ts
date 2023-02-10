import { server } from '@app/tests/msw'
import { api } from '@shared/api'
import { setupApiStore } from '@shared/utils/setupApiStore'
import '@testing-library/jest-dom'
import 'intersection-observer'
import 'whatwg-fetch'

const storeRef = setupApiStore(api, {})

beforeAll(() => {
	server.listen()
})

afterEach(() => {
	server.resetHandlers()
	storeRef.store.dispatch(api.util.resetApiState())
})

afterAll(() => server.close())
