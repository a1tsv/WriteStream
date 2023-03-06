import { LoginForm } from '@features/LoginForm'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

export default {
	title: 'Features/LoginForm',
	component: LoginForm,
	parameters: {
		msw: [
			rest.post(`${baseURL}/auth/login`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				return res(ctx.json({}))
			}),
			rest.get(`${baseURL}/auth/refresh-token`, (req, res, ctx) => {
				return res(ctx.status(401))
			})
		]
	}
} as ComponentMeta<typeof LoginForm>

export const Default = () => <LoginForm />
