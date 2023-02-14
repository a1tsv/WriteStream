import { IGetItemsResponse } from '@shared/api/api.interface'
import { anotherItemsExist } from '@shared/utils/anotherItemsExist/anotherItemsExist'

describe('anotherItemsExist', () => {
	const data: IGetItemsResponse<any> = {
		items: [1, 2, 3],
		totalCount: 4,
		page: 1,
		pagesCount: 2,
		pageSize: 3
	}

	it('should return false if data is undefined', () => {
		const data = undefined
		expect(anotherItemsExist(data)).toBe(false)
	})
	it('should return false if data.items is undefined', () => {
		const data = {
			items: undefined,
			totalCount: 0
		} as IGetItemsResponse<any>
		expect(anotherItemsExist(data)).toBe(false)
	})
	it('should return false if data.items.length is equal to data.totalCount', () => {
		const data = {
			items: [1, 2, 3],
			totalCount: 3
		} as IGetItemsResponse<any>
		expect(anotherItemsExist(data)).toBe(false)
	})
	it('should return true if data.items.length is less than data.totalCount', () => {
		expect(anotherItemsExist(data)).toBe(true)
	})
})
