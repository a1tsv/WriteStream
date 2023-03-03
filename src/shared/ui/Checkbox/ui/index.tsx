import { CheckBoxButton } from './StyledCheckBox'
import { Switch } from '@headlessui/react'
import { FC, Fragment, PropsWithChildren } from 'react'

interface ICheckBoxProps {
	checked: boolean
	onChange: () => void
}

export const CheckBox: FC<PropsWithChildren<ICheckBoxProps>> = ({
	checked,
	onChange,
	children
}) => {
	return (
		<Switch checked={checked} onChange={onChange} as={Fragment}>
			<CheckBoxButton checked={checked}>{children}</CheckBoxButton>
		</Switch>
	)
}
