import { FormLabel } from '@shared/ui/FormLayout'
import { FC, PropsWithChildren } from 'react'
import { FieldError } from 'react-hook-form'

interface IFormField {
	label: string
	error?: FieldError
}

export const FormField: FC<PropsWithChildren<IFormField>> = ({
	error,
	label,
	children
}) => {
	return (
		<FormLabel error={error?.message}>
			{error ? error.message : label}
			{children}
		</FormLabel>
	)
}
