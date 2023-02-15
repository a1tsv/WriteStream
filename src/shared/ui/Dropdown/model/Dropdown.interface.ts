import { SXType } from '@shared/types'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'

export interface IDropDownItem {
	icon?: ReactNode
	title: string
	value: string
}

export interface IDropDownProps {
	button: string | IconType
	selected?: string
	select?: boolean
	onChangeCb: (value: string) => void
	items: IDropDownItem[]
	sx?: SXType
}
