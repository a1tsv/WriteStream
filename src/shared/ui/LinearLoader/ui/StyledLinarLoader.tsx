import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
  0% {
    width: 0;
    left: 0;
  }
  10% {
    left: 10%;
    width: 40%;
  }
  25%{
    left: 15%;
    width: 30%;
  }
  40% {
    left: 40%;
    width: 20%;
  }
  60% {
    left: 60%;
    width: 43%;
  }
  80% {
    left: 80%;
    width: 20%;
  }
  100% {
    width: 30%;
    left: 100%;
  }
`
export const LinearLoaderBar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
	background: transparent;
	z-index: 10;
`

export const Progress = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	background: var(--color-main);
	animation: ${loadingAnimation} 2s linear infinite;
	transition: width 0.1s ease-in-out;
	z-index: 11;
	border-radius: var(--radius);
`
