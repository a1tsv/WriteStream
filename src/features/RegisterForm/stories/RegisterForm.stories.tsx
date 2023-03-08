import { RegisterForm } from '../ui'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

export default {
	title: 'Features/RegisterForm',
	component: RegisterForm,
	parameters: {
		msw: [
			rest.post(`${baseURL}/auth/registration`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof RegisterForm>

export const Default = () => <RegisterForm />
