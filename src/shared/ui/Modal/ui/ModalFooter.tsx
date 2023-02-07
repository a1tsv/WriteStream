import { Button } from '@shared/ui/Button'
import { ModalStyledFooter } from '@shared/ui/Modal/ui/StyledModal'
import { FC } from 'react'

interface IModalFooterProps {
	onClose: () => void
	submitAction: () => void
}

export const ModalFooter: FC<IModalFooterProps> = ({
	onClose,
	submitAction
}) => {
	return (
		<ModalStyledFooter>
			<Button variant={'secondary'} onClick={onClose}>
				Cancel
			</Button>
			<Button variant={'primary'} onClick={submitAction}>
				Submit
			</Button>
		</ModalStyledFooter>
	)
}
