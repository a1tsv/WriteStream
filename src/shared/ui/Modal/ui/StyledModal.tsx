import styled from 'styled-components'

export const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
`
export const ModalWrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 500px;
	background-color: var(--color-secondary);
	z-index: 101;
	border-radius: var(--radius);
	box-shadow: var(--shadow-modal);
	padding: 0.3rem 0.5rem;
`

export const ModalStyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3rem;
	gap: 0.4rem;
	flex-wrap: wrap;
	border-bottom: 1px solid var(--color-light);
	color: var(--color-primary);

	margin-bottom: 0.3rem;
`

export const ModalCrossButton = styled.button`
	color: var(--color-primary);
	transition: color 0.3s ease-in 0s;

	@media (any-hover: hover) {
		&:hover {
			color: var(--color-purple);
		}
	}
`
export const ModalStyledFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3rem;
	gap: 0.4rem;
	flex-wrap: wrap;
	border-top: 1px solid var(--color-light);

	margin-top: 0.3rem;
`
