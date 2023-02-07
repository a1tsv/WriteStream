import { useModalContext } from '@app/providers/ModalsProvider'
import { useDeleteBlogMutation } from '@entities/Blog/api'
import { useLoginMutation } from '@entities/User'
import { ActionModal } from '@shared/ui/ActionModal'
import { Flex } from '@shared/ui/Flex'
import { Typography } from '@shared/ui/Typography'

export const DeleteBlogModal = () => {
	const { closeModal, store } = useModalContext()
	const { modalProps, isOpen } = store || {}
	const { title, submitAction, id } = modalProps || {}
	const [deleteBlog, { isLoading }] = useDeleteBlogMutation()
	const [login] = useLoginMutation()

	// const deleteModal = () => {
	// 	deleteBlog(id as string)
	// }
	//
	// const testAuth = () => {
	// 	login({ loginOrEmail: 'admin', password: 'qwerty' })
	// }

	return (
		<ActionModal
			isOpen={isOpen}
			onClose={closeModal}
			label={'Delete'}
			submitAction={submitAction}
		>
			<Flex fDirection={'column'} align={'center'}>
				<Typography variant={'title'}>{title}</Typography>
				Do you want to delete this blog?
			</Flex>
		</ActionModal>
	)
}
