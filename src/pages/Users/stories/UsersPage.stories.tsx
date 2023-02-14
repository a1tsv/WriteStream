import { IUser } from '@entities/User'
import { UsersPage } from '@pages/Users'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { MemoryRouter, Routes } from 'react-router'
import { Route } from 'react-router-dom'

export default {
	title: 'Users',
	component: UsersPage,
	parameters: {
		msw: [
			rest.get(`${baseURL}/users`, (req, res, ctx) => {
				const users: IUser[] = [
					{
						id: '1',
						login: 'John',
						email: 'testEmail@test.com',
						createdAt: '2023-02-14T14:59:42.689Z'
					},
					{
						id: '2',
						login: 'Nohj',
						email: 'testEmail@test.com',
						createdAt: '2023-02-14T17:59:42.689Z'
					}
				]

				return res(
					ctx.status(200),
					ctx.json({
						items: users
					})
				)
			}),
			rest.post(`${baseURL}/users`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.delete(`${baseURL}/users/*`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof UsersPage>

export const Default = () => {
	return (
		<MemoryRouter initialEntries={['/users/']}>
			<Routes>
				<Route path={'/users'} element={<UsersPage />} />
			</Routes>
		</MemoryRouter>
	)
}
