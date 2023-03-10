// import {
// 	IForgotPasswordFields,
// 	usePasswordRecoveryMutation
// } from '@entities/User'
// import { useShowToastOnSuccess } from '@shared/hooks/useShowToastOnSuccess'
// import { Button } from '@shared/ui/Button'
// import {
// 	FormCard,
// 	FormField,
// 	FormFields,
// 	FormLayout
// } from '@shared/ui/FormLayout/ui'
// import { TextField } from '@shared/ui/Input'
// import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// export const NewPassword = () => {
// 	// API calls
// 	const [recovery, { isLoading: sendingRecoveryEmail, isSuccess }] =
// 		usePasswordRecoveryMutation()

// 	// Form config
// 	const {
// 		formState: { isValid },
// 		control,
// 		reset,
// 		getValues,
// 		handleSubmit
// 	} = useForm<{ email: string }>({
// 		defaultValues: {
// 			email: ''
// 		},
// 		mode: 'onBlur'
// 	})
// 	const { email } = getValues()

// 	// Handlers
// 	const onSubmit: SubmitHandler<IForgotPasswordFields> = async fieldsData => {
// 		await recovery(fieldsData)
// 	}

// 	useShowToastOnSuccess(isSuccess, `We have sent a recovery link`, email, reset)

// 	return (
// 		<ForgotPasswordWrapper>
// 			<FormCard>
// 				<ForgotPasswordContent>
// 					<FormLayout onSubmit={handleSubmit(onSubmit)}>
// 						<ForgotPasswordTitle variant='title'>
// 							Forgot password
// 						</ForgotPasswordTitle>
// 						<FormFields offset={5}>
// 							<Controller
// 								control={control}
// 								name={'email'}
// 								rules={rules.loginOrEmail}
// 								render={({ field, fieldState: { error } }) => (
// 									<FormField error={error} label='Email:'>
// 										<TextField {...field} />
// 									</FormField>
// 								)}
// 							/>
// 						</FormFields>
// 						<ForgotPasswordInfo>
// 							Enter your email address and we will send you further instructions
// 						</ForgotPasswordInfo>
// 						<Button
// 							variant='primary'
// 							disabled={!isValid || sendingRecoveryEmail}
// 							sx={{ marginBottom: '0.6rem' }}
// 						>
// 							Send instructions
// 						</Button>
// 						<ForgotPasswordBackTo to={'/login'}>
// 							Back to sign in
// 						</ForgotPasswordBackTo>
// 					</FormLayout>
// 				</ForgotPasswordContent>
// 			</FormCard>
// 		</ForgotPasswordWrapper>
// 	)
// }

export {}
