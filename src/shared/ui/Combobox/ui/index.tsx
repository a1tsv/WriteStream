import { Combobox } from '@headlessui/react'
import { IComboBoxItem } from '@shared/ui/Combobox/model/ComboBox.interface'
import {
	ComboBoxInput,
	ComboBoxItem,
	ComboBoxNotFound,
	ComboBoxOptions,
	ComboBoxSearchIcon,
	ComboBoxWrapper
} from '@shared/ui/Combobox/ui/StyledComboBox'
import { Loader } from '@shared/ui/Loader'
import { ChangeEvent, FC } from 'react'

interface IComboBoxProps {
	items: IComboBoxItem[]
	onChange: (value: IComboBoxItem) => void
	value: IComboBoxItem
	query: string
	setQuery: (value: string) => void
	isLoading?: boolean
}

export const ComboBox: FC<IComboBoxProps> = ({
	items,
	onChange,
	value,
	query,
	setQuery,
	isLoading
}) => {
	// Vars
	const itemsMatched = items.filter(item =>
		item.title
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes(query.toLowerCase().replace(/\s+/g, ''))
	)
	const filteredItems = query === '' ? items : itemsMatched
	const noItemsFound = !filteredItems.length && query !== ''

	// Utils
	const changeQuery = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const changeOption = (value: IComboBoxItem) => {
		onChange(value)
	}

	return (
		<Combobox value={value} by={'id'} onChange={changeOption}>
			<ComboBoxWrapper>
				<ComboBoxInput>
					<Combobox.Button>
						<ComboBoxSearchIcon />
					</Combobox.Button>
					<Combobox.Input
						placeholder='Search'
						onChange={changeQuery}
						displayValue={(item: IComboBoxItem) => item.title}
						autoComplete='off'
					/>
				</ComboBoxInput>
				<ComboBoxOptions>
					{noItemsFound ? (
						<ComboBoxNotFound>
							{isLoading ? <Loader /> : <p>No results found</p>}
						</ComboBoxNotFound>
					) : (
						<>
							{items.length > 0 &&
								filteredItems.map(item => (
									<Combobox.Option key={item.id} value={item}>
										{({ active }) => (
											<ComboBoxItem active={active}>{item.title}</ComboBoxItem>
										)}
									</Combobox.Option>
								))}
						</>
					)}
				</ComboBoxOptions>
			</ComboBoxWrapper>
		</Combobox>
	)
}
