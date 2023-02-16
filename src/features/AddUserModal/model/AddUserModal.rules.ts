import { IFieldRules } from '@shared/types/forms.interface'

export const rules: IFieldRules = {
	email: {
		required: { value: true, message: 'Email is required' },
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Email is not valid'
		},
		maxLength: {
			value: 30,
			message: 'Email must contain 30 or less characters'
		}
	},
	login: {
		required: { value: true, message: 'Login is required' },
		maxLength: {
			value: 30,
			message: 'Login must contain 30 or less characters'
		}
	},
	password: {
		required: { value: true, message: 'Password is required' }
	}
}
