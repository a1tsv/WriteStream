import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { IDeletePostModel, useDeletePostMutation } from '@entities/Post/api'
import { DeleteModal } from '@features/DeleteModal'

export const DeletePostModal = () => {
	const { modalProps, isOpen, closeModal } = useGetModalProps()
	const { title, id, blogId } = modalProps.post || {}
	const [deletePost, { isLoading }] = useDeletePostMutation()

	const deletePostHandler = async () => {
		const config: IDeletePostModel = { id, blogId }
		await deletePost(config)
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
