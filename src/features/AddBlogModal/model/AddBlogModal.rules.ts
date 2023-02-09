import { IFieldRules } from '@shared/types/forms.interface'

export const rules: IFieldRules = {
	name: {
		required: { value: true, message: 'Title is required' },
		maxLength: {
			value: 4,
			message: 'Title must contain 4 or less characters'
		}
	},
	websiteUrl: {
		required: { value: true, message: 'Website is required' },
		maxLength: {
			value: 30,
			message: 'Website must contain 40 or less characters'
		}
	},
	description: {
		required: { value: true, message: 'Content is required' },
		maxLength: {
			value: 500,
			message: 'Description must contain less than 500 characters'
		}
	}
}
