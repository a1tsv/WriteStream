import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const BackToWrapper = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: ${rem(10)};

	svg {
		color: var(--color-primary);
		transition: transform 0.3s ease-in 0s;
	}

	@media (any-hover: hover) {
		&:hover {
			svg {
				transform: translateX(-5px);
			}
		}
	}
`
