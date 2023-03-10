import { rem } from '@app/styles/mixins'
import { Tab } from '@headlessui/react'
import { Typography } from '@shared/ui/Typography'
import styled, { css } from 'styled-components'

interface ISelected {
	selected?: boolean
}

export const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export const ProfileTitle = styled(Typography).attrs({
	variant: 'title'
})`
	&:not(:last-child) {
		margin-bottom: ${rem(20)};
	}
`

export const ProfileCategories = styled(Tab.List)`
	border-bottom: 1px solid var(--color-light);
	display: flex;
	gap: ${rem(15)};
	overflow-x: auto;

	button {
		padding: 0;
	}
`

export const ProfileCategoryWrapper = styled(Tab)``

export const ProfileCategory = styled.div<ISelected>`
	position: relative;
	color: var(--color-primary);
	padding: 5px 0;

	&::after {
		content: '';
		position: absolute;
		/* bottom: ${rem(-1)}; */
		bottom: 0;
		transform: translate(0, 75%);
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--color-main);
		opacity: 0;
		transition: opacity 0.2s ease-in-out;

		${({ selected }) =>
			selected &&
			css`
				opacity: 1;
			`}
	}
`

export const ProfilePanels = styled(Tab.Panels)`
	padding: ${rem(20)} 0;
`
