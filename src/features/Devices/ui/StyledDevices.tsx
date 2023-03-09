import styled from 'styled-components'

export const DevicesList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

export const DevicesCurrentSession = styled.div`
	&:not(:last-child) {
		margin-bottom: 1rem;
	}

	border-bottom: 1px solid var(--color-gray);
`
