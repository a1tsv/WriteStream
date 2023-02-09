import { DeleteModal } from '@features/DeleteModal'
import { ComponentMeta } from '@storybook/react'

export default {
	title: 'DeleteModal',
	component: DeleteModal
} as ComponentMeta<typeof DeleteModal>

export const Default = () => {
	return (
		<DeleteModal
			isOpen={true}
			onClose={() => void 0}
			submitAction={() => void 0}
			entity='entity'
			label='label'
		/>
	)
}
