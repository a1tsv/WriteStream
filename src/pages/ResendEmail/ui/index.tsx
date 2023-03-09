import {
	ResendEmailImg,
	ResendEmailImgContainer,
	ResendEmailWrapper
} from './StyledResendEmail'
import { useResendRegisterEmailMutation } from '@entities/User'
import resend from '@public/img/resend.svg'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'
import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ResendEmail = () => {
	// Vars
	const navigate = useNavigate()
	const location = useLocation()
	const email = location?.state?.email as string | undefined

	// API calls
	const [resendEmail, { isLoading: resendingEmail, isSuccess }] =
		useResendRegisterEmailMutation()

	if (!email) return <Navigate to={'/blogs'} />

	// Handlers

	const handleEmailResend = () => {
		resendEmail(email)
	}

	useEffect(() => {
		if (!isSuccess && !resendingEmail) {
			toast.error('Something went wrong')
			navigate('/blogs')
		}
	}, [isSuccess, resendEmail])

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
