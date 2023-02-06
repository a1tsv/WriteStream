import { blogsApi } from '@entities/Blog/api/blogs.api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('blogsApi', () => {
	const storeRef = setupApiStore(blogsApi, {})
	const { store, api } = storeRef

	beforeEach(() => {
		fetchMock.resetMocks()
	})

	it('gets a list of blogs', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				data: [
					{ id: '1', title: 'Blog 1' },
					{ id: '2', title: 'Blog 2' }
				]
			})
		)

		await store.dispatch(api.endpoints.getBlogs.initiate({}))
		expect(fetchMock).toHaveBeenCalledTimes(1)
		const calls = fetchMock.mock.calls[0][0] as Request

		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogs?`)
		expect(method).toBe('GET')
	})

	it('gets a specific blog', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				data: { id: '1', title: 'Blog 1' }
			})
		)

		await store.dispatch(api.endpoints.getBlog.initiate('1'))
		expect(fetchMock).toHaveBeenCalledTimes(1)
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogs/1`)
		expect(method).toBe('GET')
	})
})
