import { Search } from '@shared/ui/Search'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Search',
	component: Search
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = args => <Search {...args} />

export const Default = Template.bind({})
Default.args = {
	value: '',
	onChange: () => void 0
}
