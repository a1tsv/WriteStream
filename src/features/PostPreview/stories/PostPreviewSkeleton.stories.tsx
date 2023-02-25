import { PostPreviewSkeleton } from '@features/PostPreview/ui/PostPreviewSkeleton'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Features/PostPreviewSkeleton',
	component: PostPreviewSkeleton
} as ComponentMeta<typeof PostPreviewSkeleton>

const Template: ComponentStory<typeof PostPreviewSkeleton> = args => {
	return <PostPreviewSkeleton {...args} />
}

export const Default = Template.bind({})
Default.args = {
	count: 1
}
