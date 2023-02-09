import { SxComponent } from '@shared/types'
import { AiOutlineLoading } from 'react-icons/ai'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Loader = styled(AiOutlineLoading)<SxComponent<object>>`
	animation: ${spin} 1s linear infinite;
	color: var(--color-primary);

	${({ sx }) => sx}
`
