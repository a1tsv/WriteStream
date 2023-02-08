import { Button } from '@shared/ui/Button'
import { ModalStyledFooter } from '@shared/ui/Modal/ui/StyledModal'
import { FC } from 'react'

interface IModalFooterProps {
	onClose: () => void
	submitAction: () => void
	disabled?: boolean
}

export const ModalFooter: FC<IModalFooterProps> = ({
	onClose,
	submitAction,
	disabled = false
}) => {
	return (
		<ModalStyledFooter>
			<Button variant={'secondary'} onClick={onClose}>
				Cancel
			</Button>
			<Button disabled={disabled} variant={'primary'} onClick={submitAction}>
				Submit
			</Button>
		</ModalStyledFooter>
	)
}
