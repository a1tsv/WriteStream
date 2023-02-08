import { IModalProps, Modal } from '@shared/ui/Modal'
import { ModalFooter } from '@shared/ui/Modal/ui/ModalFooter'
import { ModalHeader } from '@shared/ui/Modal/ui/ModalHeader'
import { FC, PropsWithChildren } from 'react'

interface IActionModalProps extends IModalProps {
	submitAction: () => void
	label: string
	disabled?: boolean
}

export const ActionModal: FC<PropsWithChildren<IActionModalProps>> = ({
	isOpen,
	onClose,
	submitAction,
	label,
	children,
	disabled = false
}) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalHeader label={label} onClose={onClose} />
				{children}
				<ModalFooter
					disabled={disabled}
					onClose={onClose}
					submitAction={submitAction}
				/>
			</Modal>
		</>
	)
}
