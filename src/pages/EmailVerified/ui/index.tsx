import {
	EmailVerifiedImg,
	EmailVerifiedImgContainer,
	EmailVerifiedInfo,
	EmailVerifiedWrapper
} from './StyledEmailVerified'
import SuccessVerification from '@public/img/bro.svg'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export const EmailVerified = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const email = location?.state?.email as string | undefined

	if (!email) return <Navigate to={'/blogs'} />

	const redirectToLogin = () => {
		navigate('/login')
	}

	return (
		<EmailVerifiedWrapper>
			<EmailVerifiedInfo>
				<Typography variant='sub-title-md'>Congratulations!</Typography>
				<Typography variant='sub-title-sm'>
					Your email has been confirmed
				</Typography>
			</EmailVerifiedInfo>
			<Button variant='primary' onClick={redirectToLogin}>
				Sign in
			</Button>
			<EmailVerifiedImgContainer>
				<EmailVerifiedImg src={SuccessVerification} />
			</EmailVerifiedImgContainer>
		</EmailVerifiedWrapper>
	)
}
