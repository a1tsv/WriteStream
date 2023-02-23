import { BreadCrumbs } from '../ui'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Shared/Breadcrumbs',
	component: BreadCrumbs
} as ComponentMeta<typeof BreadCrumbs>

const Template: ComponentStory<typeof BreadCrumbs> = args => (
	<BreadCrumbs {...args} />
)

export const Default = Template.bind({})
Default.args = {
	items: [
		{ link: 'blogs', title: 'Blogs' },
		{ link: 'blogs/1', title: 'Blog 1' }
	]
}
