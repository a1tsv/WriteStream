import { Button } from '@shared/ui/Button'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Shared/Button',
	component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
	variant: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
	variant: 'secondary'
}
