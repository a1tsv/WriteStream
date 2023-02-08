import { useModalContext } from '@app/providers/ModalsProvider'
import {
	useCreateBlogMutation,
	useUpdateBlogMutation
} from '@entities/Blog/api'
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
	const { isOpen, modalProps } = store || {}
	const { blogId, name, websiteUrl, description } = modalProps.blog || {}
	const isEdit = !!blogId
	const [createBlog] = useCreateBlogMutation()
	const [updateBlog] = useUpdateBlogMutation()

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

	const onSubmit: SubmitHandler<IBlogCreateRequestModel> = async data => {
		isEdit ? await updateBlog({ id: blogId, ...data }) : await createBlog(data)
		closeModal()
	}

	return (
		<ActionModal
			submitAction={handleSubmit(onSubmit)}
			label={isEdit ? 'Add blog' : 'Edit blog'}
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
						maxLength: {
							value: 4,
							message: 'Name must contain 4 or less characters'
						}
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
						maxLength: {
							value: 30,
							message: 'Website must contain 40 or less characters'
						}
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
						maxLength: {
							value: 500,
							message: 'Description must contain less than 500 characters'
						}
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
