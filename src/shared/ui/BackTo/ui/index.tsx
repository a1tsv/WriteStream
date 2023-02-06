import { BackToWrapper } from '@shared/ui/BackTo/ui/StyledBackTo'
import { Typography } from '@shared/ui/Typography'
import { FC } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router'

interface IBackToProps {
	to: string
	text: string
}

export const BackTo: FC<IBackToProps> = ({ to, text }) => {
	// const [shouldNavigate, setShouldNavigate] = useState(false)
	const navigate = useNavigate()

	const handleMouseEnter = () => {
		navigate(to)
		// setShouldNavigate(true)
	}

	return (
		<div>
			{/*{shouldNavigate && <Navigate replace to={to} />}*/}
			<BackToWrapper onClick={handleMouseEnter}>
				<BsArrowLeft />
				<Typography variant={'sub-title-md'}>{text}</Typography>
			</BackToWrapper>
		</div>
	)
}
