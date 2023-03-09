import { ProfileTitle, ProfileWrapper } from './StyledProfile'
import { Devices } from '@features/Devices'
import { ProfileActions } from '@features/ProfileActions'

export const ProfilePage = () => {
	return (
		<ProfileWrapper>
			<ProfileTitle>Profile page</ProfileTitle>
			<ProfileActions />
			<Devices />
		</ProfileWrapper>
	)
}
