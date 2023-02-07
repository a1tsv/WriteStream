import { Dialog, Transition } from '@headlessui/react'
import { IModalProps } from '@shared/ui/Modal'
import { ModalBackground, ModalWrapper } from '@shared/ui/Modal/ui/StyledModal'
import { FC, PropsWithChildren } from 'react'

export const Modal: FC<PropsWithChildren<IModalProps>> = ({
	isOpen,
	onClose,
	children
}) => {
	return (
		<Transition as={'div'} show={isOpen}>
			<Dialog onClose={onClose}>
				<ModalBackground />
				<Transition.Child as={'div'}>
					<ModalWrapper>
						<Dialog.Panel>{children}</Dialog.Panel>
					</ModalWrapper>
				</Transition.Child>
			</Dialog>
		</Transition>
	)
}
