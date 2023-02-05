import { dropdownItems } from '@features/Blogs/model'

export const getOptionTitleByValue = (value: string) => {
	return dropdownItems.find(option => option.value === value)?.title
}
