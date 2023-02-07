import { Dropdown } from '@shared/ui/Dropdown'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { getOptionTitleByValue } from '@shared/utils/getOptionTitleByValue'
import { FC, useState } from 'react'

interface INavigationDropdownProps {
	items: IDropDownItem[]
	params: { [p: string]: string }
	setSearchParams: (params: { [p: string]: string }) => void
}

export const NavigationDropdown: FC<INavigationDropdownProps> = ({
	items,
	params,
	setSearchParams
}) => {
	const getOptionTitleByValueInItems = getOptionTitleByValue.bind(null, items)

	const [selectedItem, setSelectedItem] = useState<string>(
		getOptionTitleByValueInItems(params.sortDirection) || items[0].title
	)

	const handleSelectedChange = (value: string) => {
		setSelectedItem(getOptionTitleByValueInItems(value) as string)
		setSearchParams({ ...params, sortDirection: value })
	}

	return (
		<Dropdown
			onChangeCb={handleSelectedChange}
			button={'Dropdown'}
			items={items}
			selected={selectedItem}
			sx={{ width: '200px' }}
		/>
	)
}
