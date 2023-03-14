import { INewPasswordFields } from './../../../entities/User/model/user.interface'
import { IFieldRules } from '@shared/types/forms.interface'
import { UseFormWatch } from 'react-hook-form'

export const rulesCreator = (
	watch: UseFormWatch<INewPasswordFields>
): IFieldRules => {
	return {
		newPassword: {
			required: { value: true, message: 'Password is required' },
			minLength: {
				value: 8,
				message: 'Password should be at least 8 characters'
			}
		},
		repeatPassword: {
			required: { value: true, message: 'Repeat password is required' },
			validate: (val: string) => {
				if (watch('newPassword') !== val) {
					return 'Your passwords do not match'
				}
			}
		}
	}
}
