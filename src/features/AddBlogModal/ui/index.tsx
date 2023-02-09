import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import {
	useCreateBlogMutation,
	useUpdateBlogMutation
} from '@entities/Blog/api'
import { IBlogCreateRequestModel } from '@entities/Blog/api/blog.interface'
import { rules } from '@features/AddBlogModal/model'
import { ActionModal } from '@shared/ui/ActionModal'
import { FormField, FormLayout } from '@shared/ui/FormLayout'
import { TextField } from '@shared/ui/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const AddBlogModal = () => {
	// Modal context
	const { modalProps, isOpen, closeModal } = useGetModalProps()
	const { id, name, websiteUrl, description } = modalProps.blog || {}

	// Api calls
	const [createBlog] = useCreateBlogMutation()
	const [updateBlog] = useUpdateBlogMutation()

	// Vars
	const isEdit = !!modalProps.blog

	// Form configuration
	const {
		formState: { isValid },
		control,
		handleSubmit
	} = useForm<IBlogCreateRequestModel>({
		defaultValues: {
			name: name || '',
			description: description || '',
			websiteUrl: websiteUrl || ''
		},
		mode: 'onBlur'
	})

	// Utils
	const onSubmit: SubmitHandler<IBlogCreateRequestModel> = async data => {
		isEdit ? await updateBlog({ id, ...data }) : await createBlog(data)
		closeModal()
	}

	return (
		<ActionModal
			submitAction={handleSubmit(onSubmit)}
			label={isEdit ? 'Edit blog' : 'Add blog'}
			isOpen={isOpen}
			onClose={closeModal}
			disabled={!isValid}
		>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name={'name'}
					rules={rules.name}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label='Name:'>
							<TextField {...field} />
						</FormField>
					)}
				/>
				<Controller
					control={control}
					name={'websiteUrl'}
					rules={rules.websiteUrl}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label='Website:'>
							<TextField {...field} />
						</FormField>
					)}
				/>
				<Controller
					control={control}
					name={'description'}
					rules={rules.description}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label='Description:'>
							<TextField isTextarea sx={{ minHeight: '150px' }} {...field} />
						</FormField>
					)}
				/>
			</FormLayout>
		</ActionModal>
	)
}
