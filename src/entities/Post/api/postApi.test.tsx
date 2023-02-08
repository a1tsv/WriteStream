import { postApi } from './post.api'
import { IUpdatePostModel } from '@entities/Post/api/post.interface'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

// Setup mock for fetch API
fetchMock.enableMocks()

describe('post api', () => {
	const storeRef = setupApiStore(postApi, {})
	const { store, api } = storeRef

	afterEach(() => {
		fetchMock.resetMocks()
	})

	it('should return posts on successful GET request', async () => {
		const posts = [
			{ id: '1', title: 'Post 1', content: 'This is post 1' },
			{ id: '2', title: 'Post 2', content: 'This is post 2' }
		]
		fetchMock.mockResponseOnce(JSON.stringify({ data: posts }))

		await store.dispatch(api.endpoints.getPosts.initiate({ model: {} }))
		expect(fetchMock).toHaveBeenCalledTimes(1)
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts?`)
		expect(method).toBe('GET')
	})

	it('gets a specific post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.getPost.initiate('1'))
		expect(fetchMock).toHaveBeenCalledTimes(1)
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1`)
		expect(method).toBe('GET')
	})

	it('creates a post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.createPost.initiate(post))
		expect(fetchMock).toHaveBeenCalledTimes(1)
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
		expect(fetchMock).toHaveBeenCalledTimes(1)
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1`)
		expect(method).toBe('PUT')
	})

	it('deletes a post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.deletePost.initiate('1'))
		expect(fetchMock).toHaveBeenCalledTimes(1)
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1`)
		expect(method).toBe('DELETE')
	})
})
