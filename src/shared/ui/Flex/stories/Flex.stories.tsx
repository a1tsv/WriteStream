import { Flex } from '@shared/ui/Flex'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Shared/Flex block',
	component: Flex
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = args => (
	<Flex {...args} sx={{ maxWidth: '400px' }}>
		Content
	</Flex>
)
export const Default = Template.bind({})

Default.args = {
	justify: 'flex-end',
	align: 'flex-start'
}
