import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { useDeleteCommentMutation } from '@entities/Comment'
import { DeleteModal } from '@features/DeleteModal'

export const DeleteCommentModal = () => {
	const { modalProps, isOpen, closeModal } = useGetModalProps()
	const { id } = modalProps.comment || {}
	const [deleteComment, { isLoading }] = useDeleteCommentMutation()

	const deleteCommentHandler = async () => {
		await deleteComment(id as string)
		closeModal()
	}

	return (
		<DeleteModal
			isOpen={isOpen}
			onClose={closeModal}
			submitAction={deleteCommentHandler}
			label={'comment'}
			disabled={isLoading}
		/>
	)
}
