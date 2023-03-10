import { emailPattern } from '@shared/patterns'
import { IFieldRules } from '@shared/types/forms.interface'

export const rules: IFieldRules = {
	email: {
		required: { value: true, message: 'Email is required' },
		pattern: {
			value: emailPattern,
			message: 'Email is invalid'
		},
		maxLength: {
			value: 30,
			message: 'Email can not be longer than 30 charachters'
		}
	}
}
