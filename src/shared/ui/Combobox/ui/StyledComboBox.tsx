import { rem } from '@app/styles/mixins'
import { Combobox } from '@headlessui/react'
import styled from 'styled-components'

interface IComboboxItem {
	active: boolean
}

export const ComboBoxWrapper = styled.div`
	position: relative;
`

export const ComboBoxInput = styled.div`
	input {
		width: 100%;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-main);
		color: var(--color-primary);
		background: transparent;
	}
`

export const ComboBoxOptions = styled(Combobox.Options)`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	z-index: 50;
	background: var(--color-secondary);
	border-radius: var(--radius);
	box-shadow: var(--shadow-modal);
`

export const ComboBoxItem = styled.span<IComboboxItem>`
	color: var(--color-primary);
	width: 100%;
	cursor: pointer;
	padding: ${rem(5)};
	transition: background 0.2s ease-in-out 0s, color 0.2s ease-in-out 0s;
	display: flex;
	align-items: center;
	gap: ${rem(5)};
	justify-content: center;
	border-radius: var(--radius);

	${({ active }) =>
		active &&
		`
    background: var(--color-main);
    color: var(--color-secondary);
  `}
`
