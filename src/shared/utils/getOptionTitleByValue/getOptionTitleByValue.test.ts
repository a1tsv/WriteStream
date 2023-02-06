import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { getOptionTitleByValue } from '@shared/utils/getOptionTitleByValue/getOptionTitleByValue'

describe('getOptionTitleByValue', () => {
	it('should return title of option by value', () => {
		const options = [
			{
				value: '1',
				title: 'option 1'
			},
			{
				value: '2',
				title: 'option 2'
			}
		]
		const value = '1'
		const result = getOptionTitleByValue(options, value)
		expect(result).toBe('option 1')
	})

	it('should return undefined if option with value not found', () => {
		const options = [
			{
				value: '1',
				title: 'option 1'
			},
			{
				value: '2',
				title: 'option 2'
			}
		]
		const value = '3'
		const result = getOptionTitleByValue(options, value)
		expect(result).toBeUndefined()
	})

	it('should return undefined if options is empty', () => {
		const options: IDropDownItem[] = []
		const value = '1'
		const result = getOptionTitleByValue(options, value)
		expect(result).toBeUndefined()
	})
})
