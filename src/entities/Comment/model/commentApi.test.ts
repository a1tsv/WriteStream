import { commentApi } from '@entities/Comment/model/comment.api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import fetchMock from 'jest-fetch-mock'

describe('CommentApi', () => {
	const storeRef = setupApiStore(commentApi, {})
	const { store, api } = storeRef

	beforeAll(() => {
		fetchMock.enableMocks()
	})

	afterEach(() => {
		fetchMock.resetMocks()
	})

	it('should get comment on successful GET request', async () => {
		const comment = { id: '1', content: 'Comment 1', postId: '1' }
		fetchMock.mockResponseOnce(JSON.stringify({ data: comment }))
		await store.dispatch(api.endpoints.getComment.initiate('1'))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/comments/1`)
		expect(method).toBe('GET')
	})

	it('should update comment on successful PUT request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}))
		await store.dispatch(
			api.endpoints.updateComment.initiate({
				id: '1',
				content: 'Comment 1'
			})
		)
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/comments/1`)
		expect(method).toBe('PUT')
	})

	it('should delete comment on successful DELETE request', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}))
		await store.dispatch(api.endpoints.deleteComment.initiate('1'))
		expect(fetchMock).toHaveBeenCalled()
		const calls = fetchMock.mock.calls[0][0] as Request
		const { url, method } = calls
		expect(url).toBe(`${baseURL}/comments/1`)
		expect(method).toBe('DELETE')
	})
})
