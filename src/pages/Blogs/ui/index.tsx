import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { Blogs } from '@features/Blogs'
import { ActionModal } from '@shared/ui/ActionModal'
import { Button } from '@shared/ui/Button'
import { FC, useState } from 'react'

export const BlogsPage: FC = () => {
	const { showModal } = useModalContext()

	const openDeleteModal = () => {
		showModal(ModalsEnum.DELETE_BLOG, true, { blog: '123' })
	}

	const [isModalOpen, setIsModalOpen] = useState(false)

	const openDeleteModal2 = () => {
		setIsModalOpen(true)
	}

	const closeDeleteModal2 = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<Button variant={'primary'} onClick={openDeleteModal}>
				Open Delete Modal
			</Button>
			<Button variant={'primary'} onClick={openDeleteModal2}>
				Open Delete Modal 2
			</Button>
			<Blogs />
			<ActionModal
				submitAction={closeDeleteModal2}
				label={'Test'}
				isOpen={isModalOpen}
				onClose={closeDeleteModal2}
			>
				Modal content
			</ActionModal>
		</>
	)
}
