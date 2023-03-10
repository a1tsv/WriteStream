import { ProfileButton, ProfileButtons } from './StyledProfileActions'
import { useLogoutMutation } from '@entities/User'

export const ProfileActions = () => {
	// API calls
	const [logout, { isLoading: loggingOut }] = useLogoutMutation()

	// Handlers
	const handleLogout = () => {
		logout()
	}

	return (
		<ProfileButtons>
			<ProfileButton onClick={handleLogout} disabled={loggingOut}>
				Logout
			</ProfileButton>
		</ProfileButtons>
	)
}
