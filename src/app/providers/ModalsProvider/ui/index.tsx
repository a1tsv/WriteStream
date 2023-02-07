import {
	ModalComponents,
	ModalContext
} from '@app/providers/ModalsProvider/model'
import { FC, PropsWithChildren, useState } from 'react'

interface IStore {
	modalType: string
	modalProps: any
	isOpen: boolean
}

export const Modals: FC<PropsWithChildren> = ({ children }) => {
	const [store, setStore] = useState<IStore>()
	const { modalType, modalProps } = store || {}

	const showModal = (modalType: string, isOpen: boolean, modalProps: any) => {
		setStore({ ...store, modalType, modalProps, isOpen })
	}

	const closeModal = () => {
		setStore({ ...store, isOpen: false } as IStore)
	}

	const renderModal = () => {
		if (modalType) {
			const Modal = ModalComponents[modalType]
			return <Modal {...modalProps} />
		}
	}

	return (
		<ModalContext.Provider value={{ store, showModal, closeModal }}>
			{renderModal()}
			{children}
		</ModalContext.Provider>
	)
}
