import styled from 'styled-components'

interface IAddModalBlogLabelProps {
	error?: string
}

export const AddModalBlogForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`

export const AddModalBlogLabel = styled.label<IAddModalBlogLabelProps>`
	font-size: 1rem;
	display: flex;
	flex-direction: column;

	${({ error }) =>
		error && {
			color: 'var(--color-error)'
		}}
`

export const AddModalBlogInput = styled.input`
	padding: 0.5rem;
	border-bottom: 1px solid var(--color-purple);
	border-radius: var(--radius);
	outline: none;
	font-size: 1rem;
	transition: border-color 0.2s ease-in-out;
	background: transparent;
	color: var(--color-primary);

	&:focus {
		border-color: var(--color-purple);
	}
`

export const AddModalBlogTextarea = styled.textarea`
	padding: 0.5rem;
	border-bottom: 1px solid var(--color-purple);
	border-radius: var(--radius);
	outline: none;
	font-size: 1rem;
	transition: border-color 0.2s ease-in-out;
	background: transparent;
	color: var(--color-primary);

	&:focus {
		border-color: var(--color-purple);
	}

	resize: none;
	min-height: 100px;
`
