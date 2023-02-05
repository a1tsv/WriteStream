import { rem } from '@app/styles/mixins'
import { Menu } from '@headlessui/react'
import styled from 'styled-components'

interface IDropDownButton {
	active: boolean
}

export const DropDownLabel = styled(Menu.Button)`
	color: var(--color-primary);
	padding: ${rem(5)};
	border: 1px solid var(--color-light);
	border-radius: var(--radius);
`

export const DropDownWrapper = styled.div`
	position: relative;
`

export const DropDownMenu = styled(Menu.Items)`
	border-radius: var(--radius);
	background: var(--color-secondary);
	border: 1px solid var(--color-light);

	display: flex;
	flex-direction: column;
	gap: 0.3rem;

	position: absolute;
	top: calc(100% + 1px);
	left: 0;
	width: 100%;
`

export const DropDownButton = styled.button<IDropDownButton>`
	color: var(--color-primary);
	width: 100%;
	cursor: pointer;
	padding: ${rem(5)};
	transition: background 0.2s ease-in-out 0s, color 0.2s ease-in-out 0s;

	${({ active }) =>
		active &&
		`
    background: var(--color-purple);
    color: var(--color-secondary);
  `}
`
