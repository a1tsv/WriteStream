import { Devices } from '../ui'
import { IDevice } from '@entities/Device'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'

const userAgent = window.navigator.userAgent
let devices: IDevice[] = [
	{
		deviceId: '1',
		title: userAgent,
		lastActiveDate: '11.11.11',
		ip: '11.11.11.11'
	},
	{
		deviceId: '2',
		title: 'Firefox',
		lastActiveDate: '22.22.22',
		ip: '22.22.22.22'
	}
]

export default {
	title: 'Features/Devices',
	component: Devices,
	parameters: {
		msw: [
			rest.get(`${baseURL}/security/devices`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(devices))
			}),
			rest.delete(`${baseURL}/security/devices`, (req, res, ctx) => {
				devices = devices.filter(device => device.title === userAgent)
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.delete(`${baseURL}/security/devices/*`, (req, res, ctx) => {
				devices = devices.filter(device => device.deviceId !== req.params[0])
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof Devices>

const Template: ComponentStory<typeof Devices> = () => <Devices />

export const Default = Template.bind({})
Default.args = {}
