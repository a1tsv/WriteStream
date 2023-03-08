import { rem } from '@app/styles/mixins'
import styled from 'styled-components'

export const ResendEmailWrapper = styled.div`
	padding: ${rem(40)} 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(30)};

	@media (max-width: ${rem(48)}) {
		gap: ${rem(10)};
	}
`

export const ResendEmailImgContainer = styled.div`
	max-width: 400px;
`

export const ResendEmailImg = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`
