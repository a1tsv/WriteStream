import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { useDeleteBlogMutation } from '@entities/Blog/api'
import { DeleteModal } from '@features/DeleteModal'

export const DeleteBlogModal = () => {
	const { modalProps, isOpen, closeModal } = useGetModalProps()
	const { name, id } = modalProps.blog || {}
	const [deleteBlog, { isLoading }] = useDeleteBlogMutation()

	const deleteModal = async () => {
		await deleteBlog(id as string)
		closeModal()
	}

	return (
		<DeleteModal
			isOpen={isOpen}
			onClose={closeModal}
			submitAction={deleteModal}
			entity={name}
			label={'post'}
		/>
	)
}
