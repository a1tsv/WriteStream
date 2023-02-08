import { server } from '@app/tests/msw'
import { IBlog } from '@entities/Blog'
import { AddBlogModal } from '@features/AddBlogModal'
import { Transition } from '@headlessui/react'
import { api } from '@shared/api'
import { baseURL } from '@shared/utils/baseURL'
import { setupApiStore } from '@shared/utils/setupApiStore'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
	const invalidDescription = Array(501)
		.fill(0)
		.map(() => 'a')
		.join('')
	const invalidWebsite = Array(31)
		.fill(0)
		.map(() => 'a')
		.join('')

	const items: IBlog[] = []

	beforeAll(() => {
		server.listen()
		fetchMock.disableMocks()
	})

	beforeEach(() => {
		server.use(
			rest.post(`${baseURL}/blogs`, (req, res, ctx) => {
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

		expect(screen.getByText('Add blog')).toBeInTheDocument()
	})

	it('submits the form correctly', async () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		fireEvent.change(screen.getByLabelText('Name:'), {
			target: { value: 'Test' }
		})
		fireEvent.change(screen.getByLabelText('Website:'), {
			target: { value: 'https://test.com' }
		})
		fireEvent.change(screen.getByLabelText('Description:'), {
			target: { value: 'Test description' }
		})
		const submitButton = screen.getByRole('button', { name: 'Submit' })
		expect(submitButton).toBeInTheDocument()
		fireEvent.click(submitButton)
		await waitFor(() => expect(items).toHaveLength(1), { timeout: 2000 })
	})

	it('should display error message when name length is more than 4', async () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const nameInput = screen.getByLabelText('Name:')
		fireEvent.change(nameInput, {
			target: { value: 'Test2' }
		})
		fireEvent.blur(nameInput)

		expect(
			await screen.findByText('Name must contain 4 or less characters')
		).toBeInTheDocument()
	})

	it('should display error message when website is not valid', async () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const websiteInput = screen.getByLabelText('Website:')
		fireEvent.change(websiteInput, {
			target: { value: invalidWebsite }
		})
		fireEvent.blur(websiteInput)

		expect(
			await screen.findByText('Website must contain 40 or less characters')
		).toBeInTheDocument()
	})

	it('should display error message when description length is more than 500', async () => {
		render(
			<Transition show={true}>
				<AddBlogModal />
			</Transition>,
			{ wrapper: storeRef.wrapper }
		)

		const descriptionInput = screen.getByLabelText('Description:')
		fireEvent.change(descriptionInput, {
			target: {
				value: invalidDescription
			}
		})
		// await userEvent.type(descriptionInput, invalidDescription)
		fireEvent.blur(descriptionInput)
		expect(
			await screen.findByText(
				'Description must contain less than 500 characters'
			)
		).toBeInTheDocument()
	})
})
