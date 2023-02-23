import { Flex } from '@shared/ui/Flex'
import { Modal } from '@shared/ui/Modal'
import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

export default {
	title: 'Shared/Modal',
	component: Modal
} as ComponentMeta<typeof Modal>

export const Default = () => {
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	return (
		<>
			<button
				style={{ cursor: 'pointer', color: 'var(--color-primary)' }}
				onClick={openModal}
			>
				Open Modal
			</button>
			<Modal isOpen={isOpen} onClose={closeModal}>
				<Flex justify={'center'} align={'center'}>
					Modal Content
				</Flex>
			</Modal>
		</>
	)
}
