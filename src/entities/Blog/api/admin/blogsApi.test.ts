import { blogsAdminApi } from '@entities/Blog/api/admin/blogs.api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('blogsApi', () => {
	beforeAll(() => {
		fetchMock.enableMocks()
	})

	beforeEach(() => {
		fetchMock.resetMocks()
	})

	const storeRef = setupApiStore(blogsAdminApi, {})
	const { store, api } = storeRef

	it('deletes a specific blog', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				data: { id: '1', title: 'Blog 1' }
			})
		)

		await store.dispatch(api.endpoints.deleteBlog.initiate('1'))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogs/1`)
		expect(method).toBe('DELETE')
	})

	it('creates a blog', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				data: { id: '1', title: 'Blog 1' }
			})
		)

		await store.dispatch(
			api.endpoints.createBlog.initiate({
				name: 'Blog 1',
				description: 'blog 1',
				websiteUrl: 'website'
			})
		)
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogs`)
		expect(method).toBe('POST')
	})

	it('updates a blog', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				data: { id: '1', title: 'Blog 1' }
			})
		)

		await store.dispatch(
			api.endpoints.updateBlog.initiate({
				id: '1',
				name: 'Blog 1',
				description: 'blog 1',
				websiteUrl: 'website'
			})
		)
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogs/1`)
		expect(method).toBe('PUT')
	})
})
