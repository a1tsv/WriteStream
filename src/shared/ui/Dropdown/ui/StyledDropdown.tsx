import { rem } from '@app/styles/mixins'
import { Menu } from '@headlessui/react'
import { SxComponent } from '@shared/types'
import styled from 'styled-components'

interface IDropDownButton {
	active: boolean
}

interface IDropDownWrapper {
	isSelect: boolean
}

export const DropDownWrapper = styled.div<
	SxComponent<object> & IDropDownWrapper
>`
	position: relative;

	& [role='menu'] {
		width: ${({ isSelect }) => (isSelect ? '100%' : 'max-content')};
	}

	& [aria-haspopup='menu'] {
		border-bottom: ${({ isSelect }) =>
			isSelect ? '1px solid var(--color-purple)' : 'none'};
		padding: ${({ isSelect }) => (isSelect ? rem(5) : '0')};
	}

	${({ sx }) => sx}
`
export const DropDownLabel = styled(Menu.Button)`
	cursor: pointer;
	color: var(--color-primary);
	border-radius: var(--radius);
	width: 100%;
`

export const DropDownMenu = styled(Menu.Items)`
	border-radius: var(--radius);
	background: var(--color-secondary);

	display: flex;
	flex-direction: column;
	gap: 0.3rem;

	position: absolute;
	top: calc(100% + 1px);
	left: 50%;
	transform: translateX(-50%);
	z-index: 50;
`

export const DropDownButton = styled.button<IDropDownButton>`
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
    background: var(--color-purple);
    color: var(--color-secondary);
  `}
`
