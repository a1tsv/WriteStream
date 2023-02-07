import { Dropdown } from '@shared/ui/Dropdown'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { getOptionTitleByValue } from '@shared/utils/getOptionTitleByValue'
import { FC, memo, useState } from 'react'

interface INavigationDropdownProps {
	items: IDropDownItem[]
	params: { [p: string]: string }
	setSearchParams: (params: { [p: string]: string }) => void
}

export const NavigationDropdown: FC<INavigationDropdownProps> = memo(
	({ items, params, setSearchParams }) => {
		console.log('NavigationDropdown render')
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
				select
				selected={selectedItem}
				sx={{ width: '200px' }}
			/>
		)
	}
)
