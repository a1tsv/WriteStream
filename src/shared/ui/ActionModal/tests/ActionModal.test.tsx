import { Transition } from '@headlessui/react'
import { ActionModal } from '@shared/ui/ActionModal'
import { fireEvent, render, screen } from '@testing-library/react'

describe('ActionModal', () => {
	const submitAction = jest.fn()
	const onClose = jest.fn()
	const label = 'Modal Label'

	it('renders the modal with the provided label and children', () => {
		const children = <div>Modal Content</div>
		render(
			<Transition show={true}>
				<ActionModal
					submitAction={submitAction}
					onClose={onClose}
					isOpen
					label={label}
				>
					{children}
				</ActionModal>
			</Transition>
		)

		expect(screen.getByText(label)).toBeInTheDocument()
		expect(screen.getByText('Modal Content')).toBeInTheDocument()
	})

	it('should not render the modal when isOpen is false', () => {
		render(
			<Transition show={false}>
				<ActionModal
					submitAction={submitAction}
					onClose={onClose}
					isOpen={false}
					label={label}
				/>
			</Transition>
		)

		expect(screen.queryByText(label)).not.toBeInTheDocument()
	})

	it('calls the provided submitAction when the submit button is clicked', () => {
		render(
			<Transition show={true}>
				<ActionModal
					label={label}
					onClose={onClose}
					isOpen
					submitAction={submitAction}
				/>
			</Transition>
		)

		fireEvent.click(screen.getByText('Submit'))
		expect(submitAction).toHaveBeenCalledTimes(1)
	})

	it('calls the provided onClose function when the close button is clicked', () => {
		render(
			<Transition show={true}>
				<ActionModal
					label={label}
					submitAction={submitAction}
					isOpen
					onClose={onClose}
				/>
			</Transition>
		)

		fireEvent.click(screen.getByText('Cancel'))
		expect(onClose).toHaveBeenCalledTimes(1)
	})
})
