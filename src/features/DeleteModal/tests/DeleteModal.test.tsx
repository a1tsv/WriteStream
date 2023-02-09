import { DeleteModal } from '@features/DeleteModal'
import { Transition } from '@headlessui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

describe('DeleteModal', () => {
	it('renders the correct text', () => {
		render(
			<Transition show={true}>
				<DeleteModal
					isOpen
					onClose={jest.fn()}
					submitAction={jest.fn()}
					label='Label'
					entity='Entity'
				/>
			</Transition>
		)

		expect(screen.getByText('Delete')).toBeInTheDocument()
		expect(screen.getByText('Entity')).toBeInTheDocument()
		expect(
			screen.getByText('Do you want to delete this Label?')
		).toBeInTheDocument()
	})

	it('calls onClose when clicking the close button', () => {
		const onClose = jest.fn()
		render(
			<Transition show={true}>
				<DeleteModal
					isOpen
					onClose={onClose}
					submitAction={jest.fn()}
					label='Label'
					entity='Entity'
				/>
			</Transition>
		)

		fireEvent.click(screen.getByText('Cancel'))
		expect(onClose).toHaveBeenCalled()
	})

	it('calls submitAction when clicking the submit button', () => {
		const submitAction = jest.fn()
		render(
			<Transition show={true}>
				<DeleteModal
					isOpen
					onClose={jest.fn()}
					submitAction={submitAction}
					label='Label'
					entity='Entity'
				/>
			</Transition>
		)

		fireEvent.click(screen.getByText('Submit'))
		expect(submitAction).toHaveBeenCalled()
	})
})
