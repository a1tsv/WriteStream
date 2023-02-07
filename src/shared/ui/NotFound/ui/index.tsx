import { Typography } from '@shared/ui/Typography'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface INotFoundProps {
	label: string
	fallback?: string
}

export const NotFound: FC<INotFoundProps> = ({ label, fallback }) => {
	return (
		<>
			<Typography variant='title'>{label}</Typography>
			{fallback && (
				<NavLink to={fallback}>
					<Typography variant='sub-title-sm'>Go back</Typography>
				</NavLink>
			)}
		</>
	)
}
