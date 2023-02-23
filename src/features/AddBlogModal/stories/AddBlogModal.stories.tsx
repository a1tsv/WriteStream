import { useModalContext } from '@app/providers/ModalsProvider'
import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { AddBlogModal } from '@features/AddBlogModal'
import { DeleteBlogModal } from '@features/DeleteBlogModal'
import { Button } from '@shared/ui/Button'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'

export default {
	title: 'Modals/AddBlogModal',
	component: AddBlogModal,
	parameters: {
		msw: [
			rest.post(`${baseURL}/blogs`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			}),
			rest.put(`${baseURL}/blogs/*`, (req, res, ctx) => {
				return res(ctx.status(200), ctx.json({}))
			})
		]
	}
} as ComponentMeta<typeof DeleteBlogModal>

export const AddModal = () => {
	const { showModal } = useModalContext()
	const openModal = () => {
		showModal(ModalsEnum.ADD_BLOG, true, {})
	}

	return (
		<Button onClick={openModal} variant={'primary'}>
			Open modal
		</Button>
	)
}

export const EditMode = () => {
	const { showModal } = useModalContext()
	const openModal = () => {
		showModal(ModalsEnum.ADD_BLOG, true, {
			blog: {
				id: 1,
				name: 'Test',
				description: 'Test description',
				websiteUrl: 'https://test.com'
			}
		})
	}

	return (
		<Button onClick={openModal} variant={'primary'}>
			Open modal
		</Button>
	)
}
