import { Container } from '@shared/ui/Container'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Shared/Container',
	component: Container
} as ComponentMeta<typeof Container>

const Template: ComponentStory<typeof Container> = args => (
	<Container {...args}>Container content</Container>
)

export const Default = Template.bind({})
Default.args = {
	padding: '10px 20px',
	big: true
}
