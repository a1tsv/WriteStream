import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { DeletePostModal } from '@features/DeletePostModal'
import { Button } from '@shared/ui/Button'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

export default {
	title: 'Modals/DeletePostModal',
	component: DeletePostModal,
	parameters: {
		msw: [
			rest.delete(`${baseURL}/posts/*`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof DeletePostModal>

export const Default = () => {
	const { showModal } = useModalContext()
	const openModal = () => {
		showModal(ModalsEnum.DELETE_POST, true, {
			id: '123',
			title: 'Post title',
			shortDescription: 'Post short description',
			content: 'Post content',
			blogId: '123',
			blogName: 'Post name',
			createdAt: '2021-01-01T00:00:00.000Z'
		})
	}

	return (
		<Button onClick={openModal} variant={'primary'}>
			Open modal
		</Button>
	)
}
