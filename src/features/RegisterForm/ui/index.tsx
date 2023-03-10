import { rules } from '../model'
import { RegisterOffer, RegisterSignIn } from './StyledRegisterForm'
import { IRegisterFields } from '@entities/User'
import { useRegisterMutation } from '@entities/User/api'
import { useShowToastOnSuccess } from '@shared/hooks/useShowToastOnSuccess'
import { Button } from '@shared/ui/Button'
import { FormField, FormLayout } from '@shared/ui/FormLayout'
import {
	FormCard,
	FormFields,
	FormShowPassword
} from '@shared/ui/FormLayout/ui'
import { TextField } from '@shared/ui/Input'
import { Typography } from '@shared/ui/Typography'
import { setItemToLC } from '@shared/utils/localStorage'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const RegisterForm = () => {
	// API
	const [register, { isLoading, isSuccess }] = useRegisterMutation()

	// Form config
	const {
		formState: { isValid },
		control,
		reset,
		getValues,
		handleSubmit
	} = useForm<IRegisterFields>({
		defaultValues: {
			login: '',
			email: '',
			password: ''
		},
		mode: 'onBlur'
	})

	// Local States
	const [showPassword, setShowPassword] = useState(false)

	const onSubmit: SubmitHandler<IRegisterFields> = async fieldsData => {
		await register(fieldsData)
		setItemToLC('email', fieldsData.email)
	}

	const changePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// Vars
	const passwordType = !showPassword ? 'password' : 'text'

	// Effects

	useShowToastOnSuccess(
		isSuccess,
		`We have sent a link to confirm you email`,
		getValues().email,
		reset
	)

	return (
		<FormCard>
			<Typography
				variant={'title'}
				sx={{ marginBottom: '0.6rem', textAlign: 'center' }}
			>
				Register
			</Typography>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<FormFields offset={20}>
					<Controller
						control={control}
						name={'login'}
						rules={rules.login}
						render={({ field, fieldState: { error } }) => (
							<FormField error={error} label='Username:'>
								<TextField {...field} />
							</FormField>
						)}
					/>
					<Controller
						control={control}
						name={'email'}
						rules={rules.email}
						render={({ field, fieldState: { error } }) => (
							<FormField error={error} label='Email:'>
								<TextField {...field} />
							</FormField>
						)}
					/>
					<Controller
						control={control}
						name={'password'}
						rules={rules.password}
						render={({ field, fieldState: { error } }) => (
							<FormField error={error} label='Password:'>
								<TextField {...field} type={passwordType} />
							</FormField>
						)}
					/>
					<FormShowPassword
						shouldShow={showPassword}
						onChange={changePasswordVisibility}
					>
						Show password
					</FormShowPassword>
				</FormFields>

				<Button
					variant={'primary'}
					type={'submit'}
					disabled={!isValid || isLoading}
					sx={{ marginBottom: '0.6rem' }}
				>
					Register
				</Button>
				<RegisterOffer>
					<Typography variant={'sub-title-sm'}>
						Already have an account?
					</Typography>
					<RegisterSignIn to={'/login'}>Sign in</RegisterSignIn>
				</RegisterOffer>
			</FormLayout>
		</FormCard>
	)
}
