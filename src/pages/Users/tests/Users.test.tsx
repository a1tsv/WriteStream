import { UsersPage } from '../ui'
import { Modals } from '@app/providers/ModalsProvider'
import { server } from '@app/tests/msw/server'
import { IUser } from '@entities/User'
import { adminAPI } from '@shared/api'
import { IGetItemsResponse } from '@shared/api/api.interface'
import { baseURL } from '@shared/utils/baseURL'
import { renderWithRouter } from '@shared/utils/renderWithRouter'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

describe('Users page', () => {
	const storeRef = setupApiStore(adminAPI, {})

	const items: IUser[] = [
		{
			id: '1',
			createdAt: '2021-01-01',
			email: 'test@gmail.com',
			login: 'User 1'
		}
	]

	const mockServerResponse: IGetItemsResponse<IUser[]> = {
		items,
		pagesCount: 1,
		page: 1,
		pageSize: 1,
		totalCount: 1
	}

	beforeEach(() => {
		server.use(
			rest.get(`${baseURL}/users`, (req, res, ctx) => {
				return res(ctx.json(mockServerResponse))
			})
		)
	})

	it('should render', () => {
		renderWithRouter(storeRef.wrapper({ children: <UsersPage /> }), {})
		expect(screen.getByText('Users')).toBeInTheDocument()
	})

	it('should render users', async () => {
		renderWithRouter(storeRef.wrapper({ children: <UsersPage /> }), {})

		expect(await screen.findByText('User 1')).toBeInTheDocument()
	})

	it('should open add user modal', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<Modals>
						<UsersPage />
					</Modals>
				)
			}),
			{}
		)

		await userEvent.click(screen.getByText('Add user'))
		expect(await screen.findByText('Add user')).toBeInTheDocument()
	})

	it('should open delete user modal', async () => {
		renderWithRouter(
			storeRef.wrapper({
				children: (
					<Modals>
						<UsersPage />
					</Modals>
				)
			}),
			{}
		)

		const deleteButtons = await screen.findAllByLabelText('Delete user')
		await userEvent.click(deleteButtons[0])

		expect(
			await screen.findByText('Do you want to delete this user?')
		).toBeInTheDocument()
	})

	it('should change the number of items per page using pagination dropdown', async () => {
		renderWithRouter(storeRef.wrapper({ children: <UsersPage /> }), {})

		const dropdown = await screen.findByText('10')
		await userEvent.click(dropdown)
		await userEvent.click(screen.getByText('15'))

		expect(screen.getByText('15')).toBeInTheDocument()
	})
})
