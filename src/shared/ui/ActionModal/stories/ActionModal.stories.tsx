import { Transition } from '@headlessui/react'
import { ActionModal } from '@shared/ui/ActionModal'
import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

export default {
	title: 'ActionModal',
	component: ActionModal
} as ComponentMeta<typeof ActionModal>

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
			<Transition show={isOpen}>
				<ActionModal
					isOpen={isOpen}
					onClose={closeModal}
					submitAction={openModal}
					label='Test'
				>
					Modal Content
				</ActionModal>
			</Transition>
		</>
	)
}
