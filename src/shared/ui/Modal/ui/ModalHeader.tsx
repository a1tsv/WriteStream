import {
	ModalCrossButton,
	ModalStyledHeader
} from '@shared/ui/Modal/ui/StyledModal'
import { Typography } from '@shared/ui/Typography'
import { FC } from 'react'
import { GrFormClose } from 'react-icons/gr'

interface IModalHeaderProps {
	label: string
	onClose: () => void
}

export const ModalHeader: FC<IModalHeaderProps> = ({ label, onClose }) => {
	return (
		<ModalStyledHeader>
			<Typography variant='title' as={'h3'}>
				{label}
			</Typography>
			<ModalCrossButton onClick={onClose}>
				<GrFormClose />
			</ModalCrossButton>
		</ModalStyledHeader>
	)
}
