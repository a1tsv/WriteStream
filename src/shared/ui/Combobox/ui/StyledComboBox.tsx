import { rem } from '@app/styles/mixins'
import { Combobox } from '@headlessui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import styled from 'styled-components'

interface IComboboxItem {
	active: boolean
}

export const ComboBoxWrapper = styled.div`
	position: relative;
`

export const ComboBoxInput = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--color-primary);

	[aria-haspopup='listbox'] {
		cursor: pointer;
		transition: transform 0.3s ease-in 0s;
	}

	input {
		width: 100%;
		padding: 0.2rem 0.5rem;
		border: 0 solid transparent;
		outline: none;
		transition: border-color 0.3s ease-in 0s;
		color: var(--color-primary);
		background: transparent;

		&:focus {
			border-color: var(--color-main);
		}
	}
`

export const ComboBoxSearchIcon = styled(AiOutlineSearch)`
	display: flex;

	color: var(--color-primary);
	font-size: ${rem(15)};
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
	max-height: ${rem(200)};
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
export const ComboBoxNotFound = styled.div`
	display: flex;
	justify-content: center;
	padding: ${rem(15)};
`
