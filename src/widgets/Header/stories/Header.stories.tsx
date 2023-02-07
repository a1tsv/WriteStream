import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Header } from '@widgets/Header'

export default {
	title: 'Header',
	component: Header,
	decorators: []
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => (
	<Header sideBarStateChanger={() => void 0} />
)

export const Default = Template.bind({})
