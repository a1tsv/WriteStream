import { Device } from '../ui'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Entities/Device',
	component: Device
} as ComponentMeta<typeof Device>

const Template: ComponentStory<typeof Device> = args => <Device {...args} />

export const Default = Template.bind({})
Default.args = {
	device: {
		deviceId: '1',
		ip: '11.11.11.11',
		lastActiveDate: '11.02.12',
		title: 'Firefox'
	}
}
