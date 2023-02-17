import { formatDate } from './formatDate'

describe('formatData', () => {
	it('should return a formatted date string', () => {
		const timestamp = '2022-01-01T00:00:00.000Z'
		const expected = '12/31/2021'
		const result = formatDate(timestamp)

		expect(result).toEqual(expected)
	})
})
