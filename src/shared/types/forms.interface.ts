import { ReactNode } from 'react'

export interface IFieldRule {
	[key: string]: object
}

export interface IControllerField<D> {
	label: string
	name: D
	rules: IFieldRule
	render: ReactNode
}

export interface IFieldRules {
	[key: string]: IFieldRule
}
