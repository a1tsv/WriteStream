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
		<Dialog onClose={onClose}>
			<ModalBackground />
			<Transition.Child
				as={'div'}
				enter={'transition-opacity'}
				enterFrom={'opacity-0'}
				enterTo={'opacity-100'}
				leave={'transition-opacity'}
				leaveFrom={'opacity-100'}
				leaveTo={'opacity-0'}
			>
				<ModalWrapper>
					<Dialog.Panel>{children}</Dialog.Panel>
				</ModalWrapper>
			</Transition.Child>
		</Dialog>
	)
}
