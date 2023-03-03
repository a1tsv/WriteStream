import { Checkbox } from '..'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Shared/Checkbox',
	component: Checkbox
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />

export const Checked = Template.bind({})
Checked.args = {
	checked: true,
	onChange: () => void 0
}

export const Unchecked = Template.bind({})
Unchecked.args = {
	checked: false,
	onChange: () => void 0
}

export const WithText = Template.bind({})
WithText.args = {
	checked: false,
	onChange: () => void 0,
	children: 'Checkbox'
}
