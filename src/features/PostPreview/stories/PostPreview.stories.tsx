import { PostPreview } from '@features/PostPreview'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'PostPreview',
	component: PostPreview
} as ComponentMeta<typeof PostPreview>

const Template: ComponentStory<typeof PostPreview> = args => (
	<PostPreview {...args} />
)

export const Default = Template.bind({})
Default.args = {
	post: {
		id: '1',
		title: 'Title',
		shortDescription: 'Short description',
		content: 'Content',
		blogId: '1',
		blogName: 'Blog name',
		createdAt: '2021-01-01'
	}
}
