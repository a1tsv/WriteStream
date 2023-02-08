import { useModalContext } from '@app/providers/ModalsProvider'
import {
	useCreatePostMutation,
	useUpdatePostMutation
} from '@entities/Post/api'
import { IUpdatePostFields } from '@entities/Post/api/post.interface'
import {
	AddModalBlogForm,
	AddModalBlogInput,
	AddModalBlogLabel,
	AddModalBlogTextarea
} from '@features/AddBlogModal/ui/StyledAddModalBlog'
import { ActionModal } from '@shared/ui/ActionModal'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const PostModal = () => {
	const { closeModal, store } = useModalContext()
	const { isOpen, modalProps } = store || {}
	const { id, title, shortDescription, content, blogId } = modalProps.post || {}
	const isEdit = !!modalProps.post
	const [createPost] = useCreatePostMutation()
	const [updatePost] = useUpdatePostMutation()

	const {
		formState: { isValid, isDirty },
		control,
		handleSubmit
	} = useForm<IUpdatePostFields>({
		defaultValues: {
			title: title || '',
			shortDescription: shortDescription || '',
			blogId: blogId || '',
			content: content || ''
		},
		mode: 'onBlur'
	})
	const formValid = !isDirty || !isValid

	const onSubmit: SubmitHandler<IUpdatePostFields> = async data => {
		isEdit ? await updatePost({ id, ...data }) : await createPost(data)
		closeModal()
	}

	return (
		<ActionModal
			submitAction={handleSubmit(onSubmit)}
			label={isEdit ? 'Edit post' : 'Add post'}
			isOpen={isOpen}
			onClose={closeModal}
			disabled={formValid}
		>
			<AddModalBlogForm onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name={'title'}
					rules={{
						required: { value: true, message: 'Title is required' },
						maxLength: {
							value: 10,
							message: 'Title must contain 4 or less characters'
						}
					}}
					render={({ field, fieldState: { error } }) => (
						<AddModalBlogLabel error={error?.message}>
							{error ? error.message : 'Title:'}
							<AddModalBlogInput {...field} />
						</AddModalBlogLabel>
					)}
				/>
				<Controller
					control={control}
					name={'shortDescription'}
					rules={{
						required: { value: true, message: 'Description is required' },
						maxLength: {
							value: 30,
							message: 'Description must contain 40 or less characters'
						}
					}}
					render={({ field, fieldState: { error } }) => (
						<AddModalBlogLabel error={error?.message}>
							{error ? error.message : 'Short description:'}
							<AddModalBlogInput {...field} />
						</AddModalBlogLabel>
					)}
				/>
				<Controller
					control={control}
					name={'content'}
					rules={{
						required: { value: true, message: 'Content is required' },
						maxLength: {
							value: 500,
							message: 'Content must contain less than 500 characters'
						}
					}}
					render={({ field, fieldState: { error } }) => (
						<AddModalBlogLabel error={error?.message}>
							{error ? error.message : 'Content:'}
							<AddModalBlogTextarea {...field} />
						</AddModalBlogLabel>
					)}
				/>
			</AddModalBlogForm>
		</ActionModal>
	)
}
