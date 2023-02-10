import { ComboBox } from '@shared/ui/Combobox'
import { IComboBoxItem } from '@shared/ui/Combobox/model'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

export default {
	title: 'ComboBox',
	component: ComboBox
} as ComponentMeta<typeof ComboBox>

const items: IComboBoxItem[] = [
	{ id: '1', title: 'Item 1' },
	{ id: '2', title: 'Item 2' },
	{ id: '3', title: 'Item 3' }
]

const Template: ComponentStory<typeof ComboBox> = args => {
	const [query, setQuery] = useState('')
	const [value, setValue] = useState<IComboBoxItem>(items[0])

	const changeValue = (value: IComboBoxItem) => {
		setValue(value)
	}

	const changeQuery = (value: string) => {
		setQuery(value)
	}

	return (
		<ComboBox
			{...args}
			value={value}
			query={query}
			setQuery={changeQuery}
			onChange={changeValue}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {
	items
}
