import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { useGetBlogsQuery } from '@entities/Blog'
import {
	useCreatePostMutation,
	useUpdatePostMutation
} from '@entities/Post/api'
import { IUpdatePostFields } from '@entities/Post/api/post.interface'
import { rules } from '@features/PostModal/model/PostModal.rules'
import { ActionModal } from '@shared/ui/ActionModal'
import { ComboBox } from '@shared/ui/Combobox'
import { IComboBoxItem } from '@shared/ui/Combobox/model'
import { FormField, FormLayout } from '@shared/ui/FormLayout/ui'
import { TextField } from '@shared/ui/Input'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export const PostModal = () => {
	// Modal context
	const { modalProps, isOpen, closeModal } = useGetModalProps()
	const { id, title, shortDescription, content, blogId, blogName } =
		modalProps?.post || {}
	const currentBlog = { id: blogId, title: blogName } as IComboBoxItem

	// Local State
	const [query, setQuery] = useState('')
	const changeQuery = (value: string) => {
		setQuery(value)
	}

	// Api calls
	const isInitial = !query && blogName
	const [createPost, { isLoading: creatingPost }] = useCreatePostMutation()
	const [updatePost, { isLoading: updatingPost }] = useUpdatePostMutation()
	const { data, isLoading: fetchingBlogs } = useGetBlogsQuery(
		{ searchNameTerm: query },
		{ skip: isInitial || !query }
	)

	// Vars
	const submittingOperation = creatingPost || updatingPost
	const isEdit = !!modalProps?.post?.id
	const modalTitle = isEdit ? 'Edit post' : 'Add post'
	const comboData =
		data?.items.map(item => ({
			id: item.id,
			title: item.name
		})) || []

	// Form configuration
	const defaultValues = {
		title: title || '',
		shortDescription: shortDescription || '',
		blog: currentBlog || {},
		content: content || ''
	}

	const {
		formState: { isValid, isDirty },
		control,
		handleSubmit
	} = useForm<IUpdatePostFields>({ defaultValues, mode: 'onBlur' })

	const formValid = !isDirty || !isValid

	// Utils
	const onSubmit: SubmitHandler<IUpdatePostFields> = async data => {
		isEdit
			? await updatePost({ id, blogId: data.blog.id, ...data })
			: await createPost({ blogId: data.blog.id, ...data })
		closeModal()
	}

	return (
		<ActionModal
			submitAction={handleSubmit(onSubmit)}
			label={modalTitle}
			isOpen={isOpen}
			onClose={closeModal}
			disabled={formValid || submittingOperation}
		>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name={'title'}
					rules={rules.title}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label={'Title:'}>
							<TextField {...field} />
						</FormField>
					)}
				/>
				<Controller
					control={control}
					name={'shortDescription'}
					rules={rules.shortDescription}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label={'Description:'}>
							<TextField {...field} />
						</FormField>
					)}
				></Controller>
				<Controller
					control={control}
					name={'blog'}
					rules={rules.blog}
					render={({ field, fieldState: { error } }) => (
						<>
							<FormField error={error} label={'Blog:'} />
							<ComboBox
								isLoading={fetchingBlogs}
								query={query}
								setQuery={changeQuery}
								items={comboData}
								{...field}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name={'content'}
					rules={rules.content}
					render={({ field, fieldState: { error } }) => (
						<FormField error={error} label={'Content:'}>
							<TextField isTextarea sx={{ minHeight: '150px' }} {...field} />
						</FormField>
					)}
				/>
			</FormLayout>
		</ActionModal>
	)
}
