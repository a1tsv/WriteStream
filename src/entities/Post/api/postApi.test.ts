import { postApi } from './post.api'
import {
	ICreatePostModel,
	IDeletePostModel,
	IUpdatePostModel
} from '@entities/Post/api/post.interface'
import { IRatePayload } from '@shared/api/api.interface'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('post api', () => {
	const storeRef = setupApiStore(postApi, {})
	const { store, api } = storeRef

	beforeAll(() => {
		fetchMock.enableMocks()
	})

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
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts?`)
		expect(method).toBe('GET')
	})

	it('gets a specific post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.getPost.initiate('1'))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1`)
		expect(method).toBe('GET')
	})

	it('creates a post', async () => {
		const post: ICreatePostModel = {
			title: 'Post 1',
			content: 'This is post 1',
			blogId: '1',
			shortDescription: 'short description'
		}
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.createPost.initiate(post))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogger/blogs/1/posts`)
		expect(method).toBe('POST')
	})

	it('updates a post', async () => {
		const post: IUpdatePostModel = {
			id: '1',
			title: 'Post 1',
			content: 'This is post 1',
			blogId: '1',
			shortDescription: 'desc'
		}
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		await store.dispatch(api.endpoints.updatePost.initiate(post))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogger/blogs/1/posts/1`)
		expect(method).toBe('PUT')
	})

	it('deletes a post', async () => {
		const post = { id: '1', title: 'Post 1', content: 'This is post 1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: post }))
		const deleteConfig: IDeletePostModel = { id: '1', blogId: '1' }
		await store.dispatch(api.endpoints.deletePost.initiate(deleteConfig))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/blogger/blogs/1/posts/1`)
		expect(method).toBe('DELETE')
	})

	it('should get comments for a post', async () => {
		const comments = [
			{ id: '1', content: 'Comment 1', postId: '1' },
			{ id: '2', content: 'Comment 2', postId: '1' }
		]
		fetchMock.mockResponseOnce(JSON.stringify({ data: comments }))
		await store.dispatch(api.endpoints.getComments.initiate('1'))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1/comments`)
		expect(method).toBe('GET')
	})

	it('should create comment for a post', async () => {
		const comment = { id: '1', content: 'Comment 1', postId: '1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: comment }))
		await store.dispatch(api.endpoints.createComment.initiate(comment))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1/comments`)
		expect(method).toBe('POST')
	})

	it('should rate the post in successful PUT request', async () => {
		const ratePayload: IRatePayload = { id: '1', likeStatus: 'Like' }
		fetchMock.mockResponseOnce(JSON.stringify({}))
		await store.dispatch(api.endpoints.ratePost.initiate(ratePayload))
		// expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/posts/1/like-status`)
		expect(method).toBe('PUT')
	})
})
