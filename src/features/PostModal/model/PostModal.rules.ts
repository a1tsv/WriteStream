import { IFieldRules } from '@shared/types/forms.interface'

export const rules: IFieldRules = {
	title: {
		required: { value: true, message: 'Title is required' },
		maxLength: {
			value: 10,
			message: 'Title must contain 4 or less characters'
		}
	},
	shortDescription: {
		required: { value: true, message: 'Description is required' },
		maxLength: {
			value: 30,
			message: 'Description must contain 40 or less characters'
		}
	},
	blog: {
		required: { value: true, message: 'Blog is required' }
	},
	content: {
		required: { value: true, message: 'Content is required' },
		maxLength: {
			value: 500,
			message: 'Content must contain less than 500 characters'
		}
	}
}
