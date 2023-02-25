import { RouterDecorator } from '@app/providers/RouterDecorator'
import { SideBar } from '@features/Sidebar'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Features/Sidebar',
	component: SideBar,
	decorators: [RouterDecorator]
} as ComponentMeta<typeof SideBar>

const Template: ComponentStory<typeof SideBar> = args => <SideBar {...args} />
export const Default = Template.bind({})
Default.args = {
	isOpen: false
}
