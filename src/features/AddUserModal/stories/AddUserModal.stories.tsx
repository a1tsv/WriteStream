import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { AddUserModal } from '@features/AddUserModal'
import { Button } from '@shared/ui/Button'
import { ComponentMeta } from '@storybook/react'

export default {
	title: 'AddUserModal',
	component: AddUserModal
} as ComponentMeta<typeof AddUserModal>

export const AddModal = () => {
	const { showModal } = useModalContext()
	const openModal = () => {
		showModal(ModalsEnum.ADD_USER, true, {})
	}

	return (
		<Button onClick={openModal} variant={'primary'}>
			Open modal
		</Button>
	)
}
