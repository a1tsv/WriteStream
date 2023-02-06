import { IDropDownItem } from '@shared/ui/Dropdown/model'

export const getOptionTitleByValue = (
	options: IDropDownItem[],
	value: string
) => {
	return options.find(option => option.value === value)?.title
}
