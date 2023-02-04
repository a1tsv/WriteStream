import { MenuLink } from '../ui'
import { RouterDecorator } from '@app/providers/RouterDecorator'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Menu Link',
	component: MenuLink,
	decorators: [RouterDecorator]
} as ComponentMeta<typeof MenuLink>

const Template: ComponentStory<typeof MenuLink> = args => (
	<div style={{ maxWidth: '200px' }}>
		<MenuLink {...args}>Link</MenuLink>
	</div>
)
export const Basic = Template.bind({})
Basic.args = {
	to: '/placeholder'
}
