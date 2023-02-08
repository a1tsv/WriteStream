import { Combobox } from '@headlessui/react'
import { IComboBoxItem } from '@shared/ui/Combobox/model/ComboBox.interface'
import {
	ComboBoxInput,
	ComboBoxItem,
	ComboBoxOptions,
	ComboBoxWrapper
} from '@shared/ui/Combobox/ui/StyledComboBox'
import { FC, useState } from 'react'

interface IComboBoxProps {
	items: IComboBoxItem[]
	onChange: (value: IComboBoxItem) => void
	selectedItem: IComboBoxItem
}

export const ComboBox: FC<IComboBoxProps> = ({
	items,
	onChange,
	selectedItem
}) => {
	const [query, setQuery] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

	const filteredItems = items.filter(item =>
		item.title
			.toLowerCase()
			.replace(/\s+/g, '')
			.includes(query.toLowerCase().replace(/\s+/g, ''))
	)

	return (
		<Combobox value={selectedItem} onChange={onChange}>
			<ComboBoxWrapper>
				<ComboBoxInput>
					<Combobox.Input
						onChange={handleInputChange}
						displayValue={item => item.title}
					/>
				</ComboBoxInput>
				<ComboBoxOptions>
					{filteredItems.length === 0 && query !== '' ? (
						<div className='p-2'>No results found</div>
					) : (
						<>
							{filteredItems.map(item => (
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
