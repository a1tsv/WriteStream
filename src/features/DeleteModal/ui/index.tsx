import { ActionModal } from '@shared/ui/ActionModal'
import { Flex } from '@shared/ui/Flex'
import { Typography } from '@shared/ui/Typography'
import { FC } from 'react'

interface IDeleteModalProps {
	isOpen: boolean
	onClose: () => void
	submitAction: () => void
	entity: string
	label: string
	disabled?: boolean
}

export const DeleteModal: FC<IDeleteModalProps> = ({
	isOpen,
	onClose,
	submitAction,
	label,
	entity,
	disabled
}) => {
	return (
		<ActionModal
			isOpen={isOpen}
			onClose={onClose}
			label={'Delete'}
			submitAction={submitAction}
			disabled={disabled}
		>
			<Flex fDirection={'column'} align={'center'}>
				<Typography variant={'title'}>{entity}</Typography>
				Do you want to delete this {label}?
			</Flex>
		</ActionModal>
	)
}
