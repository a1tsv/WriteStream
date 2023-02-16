import { IFieldRules } from '@shared/types/forms.interface'

export const rules: IFieldRules = {
	loginOrEmail: {
		required: { value: true, message: 'Login or email is required' }
	},
	password: {
		required: { value: true, message: 'Password is required' }
	}
}
