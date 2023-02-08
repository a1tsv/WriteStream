import { Modals } from '@app/providers/ModalsProvider'

export const ModalDecorator = (story: any) => {
	return (
		<Modals>
			<article>{story()}</article>
		</Modals>
	)
}
