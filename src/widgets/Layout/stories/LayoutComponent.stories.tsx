import { RouterDecorator } from '@app/providers/RouterDecorator'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Layout } from '@widgets/Layout'

export default {
	title: 'Widgets/Layout component',
	component: Layout,
	decorators: [RouterDecorator]
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = args => (
	<Layout {...args}>Layout content</Layout>
)
export const Default = Template.bind({})
