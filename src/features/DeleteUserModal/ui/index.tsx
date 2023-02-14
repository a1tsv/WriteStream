import { useGetModalProps } from '@app/providers/ModalsProvider/hooks'
import { useDeleteUserMutation } from '@entities/User'
import { DeleteModal } from '@features/DeleteModal'

export const DeleteUserModal = () => {
	// Modal
	const { modalProps, closeModal, isOpen } = useGetModalProps()
	const { id, login } = modalProps.user || ''
	// Api
	const [deleteUser, { isLoading }] = useDeleteUserMutation()

	// Utils
	const deleteUserHandler = async () => {
		await deleteUser(id as string)
		closeModal()
	}

	return (
		<DeleteModal
			isOpen={isOpen}
			onClose={closeModal}
			submitAction={deleteUserHandler}
			entity={login}
			label={'user'}
			disabled={isLoading}
		/>
	)
}
