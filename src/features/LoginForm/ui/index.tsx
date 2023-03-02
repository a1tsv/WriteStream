import { useLazyAuthMeQuery, useLoginMutation } from '@entities/User'
import { ILoginFields } from '@entities/User/model'
import { rules } from '@features/LoginForm/model'
import {
	LoginFields,
	LoginFormWrapper,
	LoginOffer,
	LoginSignUp
} from '@features/LoginForm/ui/StyledLoginForm'
import { Button } from '@shared/ui/Button'
import { FormField, FormLayout } from '@shared/ui/FormLayout'
import { TextField } from '@shared/ui/Input'
import { Typography } from '@shared/ui/Typography'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const LoginForm = () => {
	// API
	const [login, { isLoading, error, data: loginResponse }] = useLoginMutation()

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

	const onSubmit: SubmitHandler<ILoginFields> = async fieldsData => {
		await login(fieldsData)
	}

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
								<TextField {...field} />
							</FormField>
						)}
					/>
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
