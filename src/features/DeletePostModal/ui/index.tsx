import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { useDeletePostMutation } from '@entities/Post/api'
import { DeleteModal } from '@features/DeleteModal'

export const DeletePostModal = () => {
	const { modalProps, isOpen, closeModal } = useGetModalProps()
	const { title, id } = modalProps.post || {}
	const [deletePost, { isLoading }] = useDeletePostMutation()

	const deletePostHandler = async () => {
		await deletePost(id as string)
		closeModal()
	}

	return (
		<DeleteModal
			isOpen={isOpen}
			onClose={closeModal}
			submitAction={deletePostHandler}
			entity={title}
			label={'post'}
			disabled={isLoading}
		/>
	)
}
