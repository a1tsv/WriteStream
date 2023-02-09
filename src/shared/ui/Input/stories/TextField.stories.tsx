import { TextField } from '@shared/ui/Input'
import { ComponentMeta } from '@storybook/react'

export default {
	title: 'TextField',
	component: TextField
} as ComponentMeta<typeof TextField>

export const Default = () => <TextField placeholder='Enter text' />
