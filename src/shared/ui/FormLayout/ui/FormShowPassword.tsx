import { rem } from '@app/styles/mixins'
import { CheckBox } from '@shared/ui/Checkbox/ui'
import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledShowPassword = styled.div`
	display: flex;
	gap: ${rem(5)};
	align-items: center;
	color: var(--color-main);
`

interface Props {
	shouldShow: boolean
	onChange: () => void
}

export const FormShowPassword: FC<PropsWithChildren<Props>> = ({
	children,
	shouldShow,
	onChange
}) => {
	return (
		<StyledShowPassword>
			<CheckBox checked={shouldShow} onChange={onChange}>
				{children}
			</CheckBox>
		</StyledShowPassword>
	)
}
