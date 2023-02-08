import { IModalContext, ModalsEnum } from '.'
import { AddBlogModal } from '@features/AddBlogModal'
import { DeleteBlogModal } from '@features/DeleteBlogModal'
import { createContext, useContext } from 'react'

export const ModalComponents: any = {
	[ModalsEnum.ADD_BLOG]: AddBlogModal,
	[ModalsEnum.ADD_POST]: '',
	[ModalsEnum.DELETE_BLOG]: DeleteBlogModal,
	[ModalsEnum.DELETE_POST]: '',
	[ModalsEnum.EDIT_BLOG]: '',
	[ModalsEnum.EDIT_POST]: ''
}

export const initialState: IModalContext = {
	showModal: () => void 0,
	closeModal: () => void 0,
	store: {}
}

export const ModalContext = createContext(initialState)
export const useModalContext = () => {
	return useContext(ModalContext)
}
