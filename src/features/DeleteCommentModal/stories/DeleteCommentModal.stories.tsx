import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { DeleteCommentModal } from '@features/DeleteCommentModal'
import { Button } from '@shared/ui/Button'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

export default {
	title: 'DeleteCommentModal',
	component: DeleteCommentModal,
	parameters: {
		msw: [
			rest.delete(`${baseURL}/comments/*`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof DeleteCommentModal>

export const Default = () => {
	const { showModal } = useModalContext()
	const openModal = () => {
		showModal(ModalsEnum.DELETE_COMMENT, true, {
			id: '1'
		})
	}

	return (
		<Button onClick={openModal} variant={'primary'}>
			Open modal
		</Button>
	)
}
