import { server } from '@app/tests/msw'
import { DeleteBlogModal } from '@features/DeleteBlogModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { fireEvent, render, screen } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'
import React from 'react'

const submitAction = jest.fn()
const closeModal = jest.fn()
const deleteModal = jest.fn()

jest.mock('@app/providers/ModalsProvider/model/modals.data.ts', () => ({
	...jest.requireActual('@app/providers/ModalsProvider/model/modals.data.ts'),
	useModalContext: jest.fn(() => ({
		closeModal,
		store: {
			modalProps: {
				title: 'Delete Blog',
				submitAction,
				id: '1'
			},
			isOpen: true
		}
	}))
}))

describe('DeleteBlogModal', () => {
	const storeRef = setupApiStore(api, {})

	beforeAll(() => {
		server.listen()
		fetchMock.disableMocks()
	})

	beforeEach(() => {
		server.use(
			rest.delete(`${baseURL}/blogs/1`, (req, res, ctx) => {
				return res(ctx.json({}))
			})
		)
	})

	afterEach(() => {
		server.resetHandlers()
		storeRef.store.dispatch(api.util.resetApiState())
	})

	afterAll(() => server.close())

	it('renders the Delete Blog modal with the title and message', () => {
		render(
			<Transition show={true}>
				<DeleteBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Delete Blog')).toBeInTheDocument()
		expect(
			screen.getByText('Do you want to delete this blog?')
		).toBeInTheDocument()
	})

	it('calls the deleteBlog mutation when the delete button is clicked', () => {
		render(
			<Transition show={true}>
				<DeleteBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const deleteButton = screen.getByRole('button', { name: 'Submit' })
		fireEvent.click(deleteButton)
		expect(deleteModal).toHaveBeenCalled()
	})

	it('calls the closeModal function when the cancel button is clicked', () => {
		render(
			<Transition show={true}>
				<DeleteBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const cancelButton = screen.getByRole('button', { name: 'Cancel' })
		fireEvent.click(cancelButton)
		expect(closeModal).toHaveBeenCalled()
	})
})
