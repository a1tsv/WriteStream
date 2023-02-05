import { Dropdown } from '@shared/ui/Dropdown'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

export default {
	title: 'Dropdown',
	components: Dropdown
} as ComponentMeta<typeof Dropdown>

const dropdownItems: IDropDownItem[] = [
	{
		title: 'Item 1',
		value: 'item1'
	},
	{
		title: 'Item 2',
		value: 'item2'
	},
	{
		title: 'Item 3',
		value: 'item3'
	}
]

const Template: ComponentStory<typeof Dropdown> = args => {
	const [selectedItem, setSelectedItem] = useState<string>('')

	const changeSelected = (value: string) => {
		setSelectedItem(value)
	}

	return (
		<div style={{ maxWidth: '400px' }}>
			<Dropdown {...args} onChangeCb={changeSelected} selected={selectedItem} />
		</div>
	)
}

export const Default = Template.bind({})
Default.args = {
	button: 'Dropdown',
	items: dropdownItems
}
