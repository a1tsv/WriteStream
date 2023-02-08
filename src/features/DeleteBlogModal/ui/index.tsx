import { useModalContext } from '@app/providers/ModalsProvider'
import { useDeleteBlogMutation } from '@entities/Blog/api'
import { ActionModal } from '@shared/ui/ActionModal'
import { Flex } from '@shared/ui/Flex'
import { Typography } from '@shared/ui/Typography'

export const DeleteBlogModal = () => {
	const { closeModal, store } = useModalContext()
	const { modalProps, isOpen } = store || {}
	const { title, submitAction, id } = modalProps || {}
	const [deleteBlog, { isLoading }] = useDeleteBlogMutation()

	const deleteModal = () => {
		void deleteBlog(id as string)
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
				Do you want to delete this blog?
			</Flex>
		</ActionModal>
	)
}
