import { postAdminAPI } from './post.api'
import { IUpdatePostModel } from '@entities/Post/api/post.interface'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('post api', () => {
	const storeRef = setupApiStore(postAdminAPI, {})
	const { store, api } = storeRef

	beforeAll(() => {
		fetchMock.enableMocks()
	})

	afterEach(() => {
		fetchMock.resetMocks()
	})

	it('creates a post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.createPost.initiate(post))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts`)
		expect(method).toBe('POST')
	})

	it('updates a post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(
			api.endpoints.updatePost.initiate(post as IUpdatePostModel)
		)
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1`)
		expect(method).toBe('PUT')
	})

	it('deletes a post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.deletePost.initiate('1'))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1`)
		expect(method).toBe('DELETE')
	})
})
