import { IModalProps, Modal } from '@shared/ui/Modal'
import { ModalFooter } from '@shared/ui/Modal/ui/ModalFooter'
import { ModalHeader } from '@shared/ui/Modal/ui/ModalHeader'
import { FC, PropsWithChildren } from 'react'

interface IActionModalProps extends IModalProps {
	submitAction: () => void
	label: string
}

export const ActionModal: FC<PropsWithChildren<IActionModalProps>> = ({
	isOpen,
	onClose,
	submitAction,
	label,
	children
}) => {
	const submitHandler = () => {
		submitAction()
		onClose()
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalHeader label={label} onClose={onClose} />
				{children}
				<ModalFooter onClose={onClose} submitAction={submitHandler} />
			</Modal>
		</>
	)
}
