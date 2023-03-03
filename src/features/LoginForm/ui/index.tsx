import { useLazyAuthMeQuery, useLoginMutation } from '@entities/User'
import { ILoginFields } from '@entities/User/model'
import { rules } from '@features/LoginForm/model'
import {
	LoginFields,
	LoginFormWrapper,
	LoginOffer,
	LoginShowPassword,
	LoginSignUp
} from '@features/LoginForm/ui/StyledLoginForm'
import { Switch } from '@headlessui/react'
import { Button } from '@shared/ui/Button'
import { Checkbox } from '@shared/ui/Checkbox'
import { CheckBox } from '@shared/ui/Checkbox/ui'
import { FormField, FormLayout } from '@shared/ui/FormLayout'
import { TextField } from '@shared/ui/Input'
import { Typography } from '@shared/ui/Typography'
import { Fragment, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const LoginForm = () => {
	// API
	const [login, { isLoading, error }] = useLoginMutation()

	// Form config
	const {
		formState: { isValid },
		setError,
		control,
		handleSubmit
	} = useForm<ILoginFields>({
		defaultValues: {
			loginOrEmail: '',
			password: ''
		},
		mode: 'onBlur'
	})

	// Local States
	const [showPassword, setShowPassword] = useState(false)

	const onSubmit: SubmitHandler<ILoginFields> = async fieldsData => {
		await login(fieldsData)
	}

	const changePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// Vars
	const passwordType = !showPassword ? 'password' : 'text'

	useEffect(() => {
		if (error) {
			const fieldError = {
				type: 'server',
				message: 'Invalid login or password'
			}

			setError('loginOrEmail', fieldError)
			setError('password', fieldError)
		}
	}, [error])

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
						name={'loginOrEmail'}
						rules={rules.loginOrEmail}
						render={({ field, fieldState: { error } }) => (
							<FormField error={error} label='Name:'>
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
						Don&rsquo;t have an&nbsp;account?
					</Typography>
					<LoginSignUp to={'/register'}>Sign up</LoginSignUp>
				</LoginOffer>
			</FormLayout>
		</LoginFormWrapper>
	)
}
