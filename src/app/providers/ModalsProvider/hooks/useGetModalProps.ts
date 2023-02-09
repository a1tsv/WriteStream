import { useModalContext } from '@app/providers/ModalsProvider'

export const useGetModalProps = () => {
	const { closeModal, store } = useModalContext()
	const { modalProps, isOpen } = store || {}

	return { modalProps, isOpen, closeModal }
}
