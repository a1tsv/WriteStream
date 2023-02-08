import { useModalContext } from '@app/providers/ModalsProvider'
import { useDeletePostMutation } from '@entities/Post/api'
import { ActionModal } from '@shared/ui/ActionModal'
import { Flex } from '@shared/ui/Flex'
import { Typography } from '@shared/ui/Typography'

export const DeletePostModal = () => {
	const { closeModal, store } = useModalContext()
	const { modalProps, isOpen } = store || {}
	const { title, id } = modalProps.post || {}
	const [deletePost, { isLoading }] = useDeletePostMutation()

	const deleteModal = async () => {
		await deletePost(id as string)
		closeModal()
	}

	return (
		<ActionModal
			isOpen={isOpen}
			onClose={closeModal}
			label={'Delete'}
			submitAction={deleteModal}
		>
			<Flex fDirection={'column'} align={'center'}>
				<Typography variant={'title'}>{title}</Typography>
				Do you want to delete this post?
			</Flex>
		</ActionModal>
	)
}
