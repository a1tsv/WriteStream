import { IRegisterFields } from '@entities/User'
import { useRegisterMutation } from '@entities/User/api'
import { rules } from '@features/LoginForm/model'
import {
	LoginFields,
	LoginFormWrapper,
	LoginOffer,
	LoginShowPassword,
	LoginSignUp
} from '@features/LoginForm/ui/StyledLoginForm'
import { Button } from '@shared/ui/Button'
import { CheckBox } from '@shared/ui/Checkbox/ui'
import { FormField, FormLayout } from '@shared/ui/FormLayout'
import { TextField } from '@shared/ui/Input'
import { Typography } from '@shared/ui/Typography'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const RegisterForm = () => {
	// API
	const [register, { isLoading, error }] = useRegisterMutation()

	// Form config
	const {
		formState: { isValid },
		control,
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
	}

	const changePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// Vars
	const passwordType = !showPassword ? 'password' : 'text'

	return (
		<LoginFormWrapper>
			<Typography
				variant={'title'}
				sx={{ marginBottom: '0.6rem', textAlign: 'center' }}
			>
				Login
			</Typography>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<LoginFields>
					<Controller
						control={control}
						name={'login'}
						rules={rules.loginOrEmail}
						render={({ field, fieldState: { error } }) => (
							<FormField error={error} label='Username:'>
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
					<LoginShowPassword>
						<CheckBox
							checked={showPassword}
							onChange={changePasswordVisibility}
						>
							Show password
						</CheckBox>
					</LoginShowPassword>
				</LoginFields>

				<Button
					variant={'primary'}
					type={'submit'}
					disabled={!isValid || isLoading}
					sx={{ marginBottom: '0.6rem' }}
				>
					Login
				</Button>
				<LoginOffer>
					<Typography variant={'sub-title-sm'}>
						Already have an account?
					</Typography>
					<LoginSignUp to={'/login'}>Sign in</LoginSignUp>
				</LoginOffer>
			</FormLayout>
		</LoginFormWrapper>
	)
}
