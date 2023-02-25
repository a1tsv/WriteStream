import { Loader } from '@shared/ui/Loader'
import { ComponentMeta } from '@storybook/react'

export default {
	title: 'Shared/Loader',
	component: Loader
} as ComponentMeta<typeof Loader>

export const Default = () => <Loader />
