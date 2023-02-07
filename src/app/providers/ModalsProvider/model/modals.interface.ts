export enum ModalsEnum {
	'ADD_BLOG' = 'ADD_BLOG',
	'ADD_POST' = 'ADD_POST',
	'DELETE_BLOG' = 'DELETE_BLOG',
	'DELETE_POST' = 'DELETE_POST',
	'EDIT_BLOG' = 'EDIT_BLOG',
	'EDIT_POST' = 'EDIT_POST'
}

export interface IModalComponent {
	[key: string]: Element
}

export interface IModalContext {
	showModal: (modalType: string, isOpen: boolean, modalProps?: any) => void
	closeModal: () => void
	store: any
}
