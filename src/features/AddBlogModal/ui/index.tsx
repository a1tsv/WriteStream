import { useModalContext } from '@app/providers/ModalsProvider'
import { useCreateBlogMutation } from '@entities/Blog/api'
import { IBlogCreateRequestModel } from '@entities/Blog/api/blog.interface'
import {
	AddModalBlogForm,
	AddModalBlogInput,
	AddModalBlogLabel,
	AddModalBlogTextarea
} from '@features/AddBlogModal/ui/StyledAddModalBlog'
import { ActionModal } from '@shared/ui/ActionModal'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const AddBlogModal = () => {
	const { closeModal, store } = useModalContext()
	const { isOpen } = store || {}
	const [createBlog] = useCreateBlogMutation()

	const {
		formState: { errors, isValid },
		control,
		handleSubmit
	} = useForm<IBlogCreateRequestModel>({
		defaultValues: {
			name: '',
			description: '',
			websiteUrl: ''
		},
		mode: 'onBlur'
	})

	const onSubmit: SubmitHandler<IBlogCreateRequestModel> = async data => {
		await createBlog(data)
		closeModal()
	}

	console.log('errors', errors)

	return (
		<ActionModal
			submitAction={handleSubmit(onSubmit)}
			label={'Add blog'}
			isOpen={isOpen}
			onClose={closeModal}
			disabled={!isValid}
		>
			<AddModalBlogForm onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name={'name'}
					rules={{
						required: { value: true, message: 'Name is required' },
						maxLength: { value: 4, message: 'Max length is 4' }
					}}
					render={({ field, fieldState: { error } }) => (
						<AddModalBlogLabel error={error?.message}>
							{error ? error.message : 'Name:'}
							<AddModalBlogInput {...field} />
						</AddModalBlogLabel>
					)}
				/>
				<Controller
					control={control}
					name={'websiteUrl'}
					rules={{
						required: { value: true, message: 'Website is required' },
						maxLength: { value: 30, message: 'Max length is 30' }
					}}
					render={({ field, fieldState: { error } }) => (
						<AddModalBlogLabel error={error?.message}>
							{error ? error.message : 'Website:'}
							<AddModalBlogInput {...field} />
						</AddModalBlogLabel>
					)}
				/>
				<Controller
					control={control}
					name={'description'}
					rules={{
						required: { value: true, message: 'Description is required' },
						maxLength: { value: 500, message: 'Max length is 500' }
					}}
					render={({ field, fieldState: { error } }) => (
						<AddModalBlogLabel error={error?.message}>
							{error ? error.message : 'Description:'}
							<AddModalBlogTextarea {...field} />
						</AddModalBlogLabel>
					)}
				/>
			</AddModalBlogForm>
		</ActionModal>
	)
}
