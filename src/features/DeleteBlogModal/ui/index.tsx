import { useModalContext } from '@app/providers/ModalsProvider'
import { ActionModal } from '@shared/ui/ActionModal'
import { Flex } from '@shared/ui/Flex'

export const DeleteBlogModal = () => {
	const { closeModal, store } = useModalContext()
	const { modalProps, isOpen } = store || {}
	const { blog, submitAction } = modalProps || {}

	return (
		<ActionModal
			isOpen={isOpen}
			onClose={closeModal}
			label={'Delete'}
			submitAction={submitAction}
		>
			<Flex fDirection={'column'} align={'center'} sx={{ gap: '0.5rem' }}>
				{blog}
				Do you want to delete this blog?
			</Flex>
		</ActionModal>
	)
}
