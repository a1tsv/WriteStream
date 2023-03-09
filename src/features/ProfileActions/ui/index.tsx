import { ProfileButton, ProfileButtons } from './StyledProfileActions'
import { useTerminateAllDevicesMutation } from '@entities/Device'
import { useLogoutMutation } from '@entities/User'

export const ProfileActions = () => {
	// API calls
	const [terminateAllSessions, { isLoading: terminatingSessions }] =
		useTerminateAllDevicesMutation()
	const [logout, { isLoading: loggingOut }] = useLogoutMutation()

	// Handlers
	const handleLogout = () => {
		logout()
	}

	const handleTerminateAllSessions = () => {
		terminateAllSessions()
	}

	return (
		<ProfileButtons>
			<ProfileButton
				onClick={handleTerminateAllSessions}
				disabled={terminatingSessions}
			>
				Terminate all sessions
			</ProfileButton>
			<ProfileButton onClick={handleLogout} disabled={loggingOut}>
				Logout
			</ProfileButton>
		</ProfileButtons>
	)
}
