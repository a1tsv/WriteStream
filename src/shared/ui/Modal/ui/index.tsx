import { Dialog, Transition } from '@headlessui/react'
import { ModalBackground, ModalWrapper } from '@shared/ui/Modal/ui/StyledModal'
import { FC, PropsWithChildren } from 'react'

interface IModalProps {
	isOpen: boolean
	onClose: () => void
	label: string
}

export const Modal: FC<PropsWithChildren<IModalProps>> = ({
	isOpen,
	onClose,
	label,
	children
}) => {
	return (
		<Transition
			show={isOpen}
			enter='transition-opacity'
			enterFrom='opacity-0'
			enterTo='opacity-100'
			leave='transition-opacity'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'
		>
			<Dialog onClose={onClose}>
				<ModalBackground />
				<ModalWrapper>
					<Dialog.Panel>{children}</Dialog.Panel>
				</ModalWrapper>
			</Dialog>
		</Transition>
	)
}
