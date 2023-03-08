import {
	ResendEmailImg,
	ResendEmailImgContainer,
	ResendEmailWrapper
} from './StyledResendEmail'
import { useResendRegisterEmailMutation } from '@entities/User'
import resend from '@public/img/resend.svg'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import { getItemFromLC } from '@shared/utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ResendEmail = () => {
	// Vars
	const navigate = useNavigate()

	// API calls
	const [resendEmail, { isLoading: resendingEmail }] =
		useResendRegisterEmailMutation()

	// Handlers
	const handleRequestError = () => {
		toast.error('Something went wrong')
		navigate('/blogs')
	}

	const handleEmailResend = () => {
		const email = getItemFromLC('email') as string
		if (email) {
			resendEmail(email)
			return
		}
		handleRequestError()
	}

	return (
		<ResendEmailWrapper>
			<Typography variant='sub-title-md'>
				Email verification link expired
			</Typography>
			<Typography variant='sub-title-sm'>
				Looks like the verification link has expired. Not to worry, we can send
				the link again
			</Typography>
			<Button
				disabled={resendingEmail}
				onClick={handleEmailResend}
				variant='primary'
			>
				Resend verification link
			</Button>
			<ResendEmailImgContainer>
				<ResendEmailImg src={resend} />
			</ResendEmailImgContainer>
		</ResendEmailWrapper>
	)
}
