import { Blogs } from '@features/Blogs'
import { Button } from '@shared/ui/Button'
import { Flex } from '@shared/ui/Flex'
import { Modal } from '@shared/ui/Modal'
import { ModalFooter } from '@shared/ui/Modal/ui/ModalFooter'
import { ModalHeader } from '@shared/ui/Modal/ui/ModalHeader'
import { FC, useState } from 'react'

export const BlogsPage: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	return (
		<>
			<Button variant={'primary'} onClick={openModal}>
				Open Modal
			</Button>
			<Modal isOpen={isModalOpen} onClose={closeModal} label={'Test'}>
				<ModalHeader label={'Test'} onClose={closeModal} />
				<Flex justify={'center'} align={'center'}>
					Modal Content
				</Flex>
				<ModalFooter onClose={closeModal} submitAction={closeModal} />
			</Modal>
			<Blogs />
		</>
	)
}
