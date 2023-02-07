import {
	ModalComponents,
	ModalContext
} from '@app/providers/ModalsProvider/model'
import { Transition } from '@headlessui/react'
import { FC, PropsWithChildren, useState } from 'react'

interface IStore {
	modalType: string
	modalProps: any
	isOpen: boolean
}

export const Modals: FC<PropsWithChildren> = ({ children }) => {
	const [store, setStore] = useState<IStore>()
	const { modalType, modalProps, isOpen } = store || {}

	const showModal = (modalType: string, isOpen: boolean, modalProps: any) => {
		setStore({ ...store, modalType, modalProps, isOpen })
	}

	const closeModal = () => {
		setStore({ ...store, isOpen: false } as IStore)
	}

	const Modal = ModalComponents[modalType as string]

	return (
		<ModalContext.Provider value={{ store, showModal, closeModal }}>
			<Transition show={!!isOpen}>
				{modalType && <Modal {...modalProps} />}
			</Transition>
			{children}
		</ModalContext.Provider>
	)
}
