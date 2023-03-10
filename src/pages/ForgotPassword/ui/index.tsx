import { IForgotPasswordFields, rules } from '../model'
import {
	ForgotPasswordBackTo,
	ForgotPasswordInfo,
	ForgotPasswordTitle
} from './StyledForgotPassword'
import { Button } from '@shared/ui/Button'
import {
	FormCard,
	FormField,
	FormFields,
	FormLayout
} from '@shared/ui/FormLayout/ui'
import { TextField } from '@shared/ui/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const ForgotPassword = () => {
	const {
		formState: { isValid },
		setError,
		control,
		handleSubmit
	} = useForm<{ email: string }>({
		defaultValues: {
			email: ''
		},
		mode: 'onBlur'
	})

	const onSubmit: SubmitHandler<IForgotPasswordFields> = async fieldsData => {
		// await login(fieldsData)
	}

	return (
		<FormLayout onSubmit={handleSubmit(onSubmit)}>
			<FormCard>
				<ForgotPasswordTitle variant='title'>
					Forgot password
				</ForgotPasswordTitle>
				<FormFields offset={5}>
					<Controller
						control={control}
						name={'email'}
						rules={rules.loginOrEmail}
						render={({ field, fieldState: { error } }) => (
							<FormField error={error} label='Email:'>
								<TextField {...field} />
							</FormField>
						)}
					/>
				</FormFields>
				<ForgotPasswordInfo>
					Enter your email address and we will send you further instructions
				</ForgotPasswordInfo>
				<Button
					variant='primary'
					disabled={isValid}
					sx={{ marginBottom: '0.6rem' }}
				>
					Send instructions
				</Button>
				<ForgotPasswordBackTo to={'/login'}>
					Back to sign in
				</ForgotPasswordBackTo>
			</FormCard>
		</FormLayout>
	)
}
