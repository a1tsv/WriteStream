import styled from 'styled-components'

interface IContainer {
	big?: boolean
	padding: string
}

export const Container = styled.div<IContainer>`
	max-width: ${({ big }) => (big ? '68rem' : '75rem')};
	padding: ${({ padding }) => padding};
	margin: 0 auto;
	width: 100%;
`
