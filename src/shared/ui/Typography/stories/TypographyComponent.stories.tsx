import { Typography } from '@shared/ui/Typography'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Typography',
	component: Typography
} as ComponentMeta<typeof Typography>

const Template: ComponentStory<typeof Typography> = args => (
	<Typography {...args}>Typography</Typography>
)

export const Title = Template.bind({})
Title.args = {
	variant: 'title'
}

export const SubTitleMd = Template.bind({})
SubTitleMd.args = {
	variant: 'sub-title-md'
}

export const SubTitleSm = Template.bind({})
SubTitleSm.args = {
	variant: 'sub-title-sm'
}
