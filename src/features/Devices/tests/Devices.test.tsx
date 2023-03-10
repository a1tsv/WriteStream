import { Devices } from '../ui'
import { server } from '@app/tests/msw'
import { IDevice } from '@entities/Device'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import { rest } from 'msw'

describe('Devices', () => {
	const storeRef = setupApiStore(api, {})

	Object.defineProperty(navigator, 'userAgent', {
		value: 'Chrome'
	})

	let items: IDevice[]

	beforeEach(() => {
		items = [
			{
				deviceId: '1',
				title: 'Chrome',
				lastActiveDate: '11.11.11',
				ip: '11.111.111'
			},
			{
				deviceId: '2',
				title: 'Firefox',
				lastActiveDate: '22.22.22',
				ip: '22.222.222'
			}
		]

		server.use(
			rest.get(`${baseURL}/security/devices`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(items))
			}),
			rest.delete(`${baseURL}/security/devices`, (req, res, ctx) => {
				items = items.filter(device => device.title === 'Chrome')
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.delete(`${baseURL}/security/devices/*`, (req, res, ctx) => {
				items = items.filter(device => device.deviceId === req.params[0])
				return res(ctx.status(200), ctx.json({}))
			})
		)
	})

	it('should render the list of devices', async () => {
		renderWithRouter(storeRef.wrapper({ children: <Devices /> }), {})

		expect(await screen.findByText('Chrome')).toBeInTheDocument()
		expect(screen.getByText('Firefox')).toBeInTheDocument()
	})

	it('should render the current session', async () => {
		server.use(
			rest.get(`${baseURL}/security/devices`, (req, res, ctx) => {
				return res(ctx.json([items[0]]))
			})
		)

		renderWithRouter(storeRef.wrapper({ children: <Devices /> }), {})
		expect(screen.getByText('Current session:')).toBeInTheDocument()
		expect(await screen.findByText('Chrome')).toBeInTheDocument()
		expect(screen.getByText(/No other sessions found/i)).toBeInTheDocument()
	})

	it('should terminate all sessions when the button is clicked', async () => {
		renderWithRouter(storeRef.wrapper({ children: <Devices /> }), {})

		expect(await screen.findByText('Chrome')).toBeInTheDocument()
		expect(screen.getByText('Firefox')).toBeInTheDocument()

		screen.getByText(/Terminate all sessions/i).click()

		expect(
			await screen.findByText(/No other sessions found/i)
		).toBeInTheDocument()
	})
})
