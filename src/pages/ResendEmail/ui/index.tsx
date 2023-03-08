import {
	ResendEmailImg,
	ResendEmailImgContainer,
	ResendEmailWrapper
} from './StyledResendEmail'
import resend from '@public/img/resend.svg'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'

export const ResendEmail = () => {
	return (
		<ResendEmailWrapper>
			<Typography variant='sub-title-md'>
				Email verification link expired
			</Typography>
			<Typography variant='sub-title-sm'>
				Looks like the verification link has expired. Not to worry, we can send
				the link again
			</Typography>
			<Button variant='primary'>Resend verification link</Button>
			<ResendEmailImgContainer>
				<ResendEmailImg src={resend} />
			</ResendEmailImgContainer>
		</ResendEmailWrapper>
	)
}
