import { server } from '@app/tests/msw'
import { IBlog } from '@entities/Blog'
import { AddBlogModal } from '@features/AddBlogModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { render, screen } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { rest } from 'msw'

jest.mock('@app/providers/ModalsProvider', () => {
	return {
		useModalContext: jest.fn(() => ({
			closeModal: jest.fn(),
			store: {
				isOpen: true
			}
		}))
	}
})

describe('AddBlogModal', () => {
	const storeRef = setupApiStore(api, {})

	const items: IBlog[] = []

	beforeAll(() => {
		server.listen()
		fetchMock.disableMocks()
	})

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/blogs/`, (req, res, ctx) => {
				items.push(req.body as IBlog)
				return res(ctx.json({}))
			})
		)
	})

	afterEach(() => {
		server.resetHandlers()
		storeRef.store.dispatch(api.util.resetApiState())
	})

	afterAll(() => server.close())

	it('renders the Add Blog modal with the title', () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		expect(screen.getByText('Add Blog')).toBeInTheDocument()
	})
})
