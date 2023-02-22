import {
	getItemFromLC,
	removeItemFromLC,
	setItemToLC
} from '@shared/utils/localStorage/localStorage'

describe('local storage utils', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('should return undefined if item does not exist in local storage', () => {
		const result = getItemFromLC('non-existent-key') as undefined
		expect(result).toBeUndefined()
	})

	it('should return the parsed item if it exists in local storage', () => {
		const item = { foo: 'bar' }
		localStorage.setItem('existing-key', JSON.stringify(item))
		const result = getItemFromLC('existing-key') as typeof item
		expect(result).toEqual(item)
	})

	it('should set an item in local storage', () => {
		const key = 'key'
		const value = 'value'
		setItemToLC(key, value)
		const item = localStorage.getItem(key) as string
		expect(JSON.parse(item)).toBe(value)
	})

	it('should set an item in local storage using setItemToLC and get item from the local storage using getItemFromLC', () => {
		const key = 'key'
		const value = 'value'
		setItemToLC(key, value)
		const result = getItemFromLC(key) as typeof value
		expect(result).toEqual(value)
	})

	it('should remove an item from the localStorage using removeItemFromLC', () => {
		const key = 'key'
		const value = 'value'
		setItemToLC(key, value)
		removeItemFromLC(key)
		const result = getItemFromLC(key) as undefined
		expect(result).toBeUndefined()
	})
})
