import styled from 'styled-components'

export const SearchWrapper = styled.div`
	height: 100%;
	padding: 0.2rem;
	display: flex;
	gap: 0.1rem;
	//border: 1px solid var(--color-main);
	border-radius: var(--radius);
	align-items: center;
	background: var(--color-bg);
`

export const SearchInput = styled.input`
	border: none;
	outline: none;
	background: transparent;
	width: 100%;
	height: 100%;

	color: var(--color-primary);
`
