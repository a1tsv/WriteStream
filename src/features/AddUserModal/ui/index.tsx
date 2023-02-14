import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { IAddUserFields, useCreateUserMutation } from '@entities/User'
import { rules } from '@features/AddUserModal/model'
import { ActionModal } from '@shared/ui/ActionModal'
import { FormField, FormLayout } from '@shared/ui/FormLayout'
import { TextField } from '@shared/ui/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const AddUserModal = () => {
	// Modal context
	const { modalProps, isOpen, closeModal } = useGetModalProps()

	// Api calls
	const [addUser, { isLoading: creatingUser }] = useCreateUserMutation()

	// Vars
	const submittingOperation = creatingUser

	// Form configuration
	const {
		formState: { isValid },
		control,
		handleSubmit
	} = useForm<IAddUserFields>({
		defaultValues: {
			email: '',
			login: '',
			password: ''
		},
		mode: 'onBlur'
	})

	// Utils
	const onSubmit: SubmitHandler<IAddUserFields> = async data => {
		await addUser(data)
		closeModal()
	}

	return (
		<ActionModal
			submitAction={handleSubmit(onSubmit)}
			label={'Add user'}
			isOpen={isOpen}
			onClose={closeModal}
			disabled={!isValid || submittingOperation}
		>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name={'login'}
					rules={rules.login}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label='Login:'>
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
					rules={rules.description}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label='Password:'>
							<TextField {...field} />
						</FormField>
					)}
				/>
			</FormLayout>
		</ActionModal>
	)
}
