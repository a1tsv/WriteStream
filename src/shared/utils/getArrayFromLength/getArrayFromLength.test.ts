import { getArrayFromLength } from '@shared/utils/getArrayFromLength/getArrayFromLength'

describe('getArrayFromLength', () => {
	it('should return an array of the given length', () => {
		expect(getArrayFromLength(3)).toEqual([0, 1, 2])
	})

	it('should return an empty array if the given length is 0', () => {
		expect(getArrayFromLength(0)).toEqual([])
	})

	it('should return an empty array if the given length is negative', () => {
		expect(getArrayFromLength(-1)).toEqual([])
	})

	it('should return an empty array if the given length is not a number', () => {
		expect(getArrayFromLength(NaN)).toEqual([])
	})

	it('should return an empty array if the given length is Infinity', () => {
		expect(getArrayFromLength(Infinity)).toEqual([])
	})

	it('should return an empty array if the given length is -Infinity', () => {
		expect(getArrayFromLength(-Infinity)).toEqual([])
	})
})
