import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { Blogs } from '@features/Blogs'
import { Button } from '@shared/ui/Button'
import { FC } from 'react'

export const BlogsPage: FC = () => {
	const { showModal } = useModalContext()

	const openDeleteModal = () => {
		console.log('in open delete modal')
		showModal(ModalsEnum.DELETE_BLOG, true, { blog: '123' })
	}

	return (
		<>
			<Button variant={'primary'} onClick={openDeleteModal}>
				Open Delete Modal
			</Button>

			<Blogs />
		</>
	)
}
