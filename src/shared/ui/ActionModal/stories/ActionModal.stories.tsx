import { ActionModal } from '@shared/ui/ActionModal'
import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

export default {
	title: 'ActionModal',
	component: ActionModal
} as ComponentMeta<typeof ActionModal>

export const Default = () => {
	const [isOpen, setIsOpen] = useState(true)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	return (
		<ActionModal
			isOpen={isOpen}
			onClose={closeModal}
			submitAction={openModal}
			label='Test'
		>
			Modal Content
		</ActionModal>
	)
}
