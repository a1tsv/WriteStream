import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IUser } from '@entities/User'
import { DeletePostModal } from '@features/DeletePostModal'
import { DeleteUserModal } from '@features/DeleteUserModal'
import { Button } from '@shared/ui/Button'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

export default {
	title: 'DeleteUserModal',
	component: DeleteUserModal,
	parameters: {
		msw: [
			rest.delete(`${baseURL}/users/1`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof DeletePostModal>

export const Default = () => {
	const { showModal } = useModalContext()
	const openModal = () => {
		const user: IUser = {
			id: '1',
			createdAt: '2021-07-01T12:00:00.000Z',
			login: 'test',
			email: 'test@email.com'
		}

		showModal(ModalsEnum.DELETE_USER, true, { user })
	}

	return (
		<Button onClick={openModal} variant={'primary'}>
			Open modal
		</Button>
	)
}
