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
import { Typography } from '@shared/ui/Typography'
import { ChangeEvent, FC, forwardRef, useMemo } from 'react'

interface IComboBoxProps {
	items: IComboBoxItem[]
	onChange: (value: IComboBoxItem) => void
	value: IComboBoxItem
	query: string
	setQuery: (value: string) => void
	isLoading?: boolean
}

export const ComboBox: FC<IComboBoxProps> = forwardRef(
	({ items, onChange, value, query, setQuery, isLoading }, ref) => {
		// Vars
		const itemsMatched = useMemo(
			() =>
				items.filter(item =>
					item.title
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
				),
			[items, query]
		)

		const nothingToDisplay = !items.length && query === ''
		const itemsToDisplay = query === '' ? items : itemsMatched
		const noItemsFound = !itemsToDisplay.length && query !== ''

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
					{!nothingToDisplay && (
						<ComboBoxOptions>
							{noItemsFound ? (
								<ComboBoxNotFound>
									{isLoading ? (
										<Loader aria-label={'Searching for items'} />
									) : (
										<Typography>No results found</Typography>
									)}
								</ComboBoxNotFound>
							) : (
								items.length > 0 &&
								itemsToDisplay.map(item => (
									<Combobox.Option key={item.id} value={item}>
										{({ active }) => (
											<ComboBoxItem active={active}>{item.title}</ComboBoxItem>
										)}
									</Combobox.Option>
								))
							)}
						</ComboBoxOptions>
					)}
				</ComboBoxWrapper>
			</Combobox>
		)
	}
)
