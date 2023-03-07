import { emailPattern } from '@shared/patterns'
import { IFieldRules } from '@shared/types/forms.interface'

export const rules: IFieldRules = {
	login: {
		required: { value: true, message: 'Username is required' },
		minLength: {
			value: 5,
			message: 'Username should be at least 5 characters'
		},
		maxLength: {
			value: 20,
			message: 'Username can not be longer than 20 characters'
		}
	},
	email: {
		required: { value: true, message: 'Email is required' },
		pattern: {
			value: emailPattern,
			message: 'Email is not valid'
		},
		maxLength: {
			value: 30,
			message: 'Email must contain 30 or less characters'
		}
	},
	password: {
		required: { value: true, message: 'Password is required' },
		minLength: {
			value: 8,
			message: 'Password should be at least 5 characters'
		}
	}
}
