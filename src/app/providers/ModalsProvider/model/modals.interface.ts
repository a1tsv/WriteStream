export enum ModalsEnum {
	'ADD_BLOG' = 'ADD_BLOG',
	'ADD_POST' = 'ADD_POST',
	'DELETE_BLOG' = 'DELETE_BLOG',
	'DELETE_POST' = 'DELETE_POST',
	'EDIT_BLOG' = 'EDIT_BLOG',
	'EDIT_POST' = 'EDIT_POST',
	'ADD_USER' = 'ADD_USER',
	'DELETE_USER' = 'DELETE_USER'
}

export interface IModalComponent {
	[key: string]: Element
}

export interface IModalContext {
	showModal: (modalType: ModalsEnum, isOpen: boolean, modalProps?: any) => void
	closeModal: () => void
	store: any
}
