import { rulesCreator } from '../model'
import {
	NewPasswordContent,
	NewPasswordTitle,
	NewPasswordWrapper
} from './StyledNewPassword'
import {
	IForgotPasswordFields,
	INewPasswordFields,
	useNewPasswordMutation
} from '@entities/User'
import { useShowToastOnSuccess } from '@shared/hooks/useShowToastOnSuccess'
import { Button } from '@shared/ui/Button'
import {
	FormCard,
	FormField,
	FormFields,
	FormLayout,
	FormShowPassword
} from '@shared/ui/FormLayout/ui'
import { TextField } from '@shared/ui/Input'
import { useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useSearchParams } from 'react-router-dom'

export const NewPassword = () => {
	// Params
	const [searchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const { code } = params

	if (!code) {
		return <Navigate to='/blogs' />
	}

	// API calls
	const [resetPassword, { isLoading: resettingPassword, isSuccess }] =
		useNewPasswordMutation()

	// Form config
	const {
		formState: { isValid },
		control,
		watch,
		handleSubmit
	} = useForm<INewPasswordFields>({
		defaultValues: {
			newPassword: '',
			repeatPassword: ''
		},
		mode: 'onBlur'
	})

	// Local States
	const [showPassword, setShowPassword] = useState(false)

	// Vars
	const rules = rulesCreator(watch)
	const passwordType = !showPassword ? 'password' : 'text'

	// Handlers
	const onSubmit: SubmitHandler<INewPasswordFields> = async fieldsData => {
		const { newPassword } = fieldsData
		await resetPassword({ newPassword, code })
	}

	const changePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// useShowToastOnSuccess(isSuccess, `We have sent a recovery link`, email, reset)

	return (
		<NewPasswordWrapper>
			<FormCard>
				<NewPasswordContent>
					<FormLayout onSubmit={handleSubmit(onSubmit)}>
						<NewPasswordTitle>New password</NewPasswordTitle>
						<FormFields offset={5}>
							<Controller
								control={control}
								name={'newPassword'}
								rules={rules.newPassword}
								render={({ field, fieldState: { error } }) => (
									<FormField error={error} label='New password:'>
										<TextField {...field} type={passwordType} />
									</FormField>
								)}
							/>
							<Controller
								control={control}
								name={'repeatPassword'}
								rules={rules.repeatPassword}
								render={({ field, fieldState: { error } }) => (
									<FormField error={error} label='Repeat password:'>
										<TextField {...field} type={passwordType} />
									</FormField>
								)}
							/>
							<FormShowPassword
								onChange={changePasswordVisibility}
								shouldShow={showPassword}
							>
								Show password
							</FormShowPassword>
						</FormFields>
						<Button
							variant='primary'
							disabled={!isValid || resettingPassword}
							sx={{ marginBottom: '0.6rem' }}
						>
							Set new password
						</Button>
					</FormLayout>
				</NewPasswordContent>
			</FormCard>
		</NewPasswordWrapper>
	)
}
