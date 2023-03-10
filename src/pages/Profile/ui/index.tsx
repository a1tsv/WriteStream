import { profileTabs } from '../model'
import {
	ProfileCategories,
	ProfileCategory,
	ProfilePanels,
	ProfileTitle,
	ProfileWrapper
} from './StyledProfile'
import { ProfileActions } from '@features/ProfileActions'
import { Tab } from '@headlessui/react'

export const ProfilePage = () => {
	return (
		<ProfileWrapper>
			<ProfileTitle>Profile page</ProfileTitle>
			<ProfileActions />
			<Tab.Group>
				<ProfileCategories>
					{Object.keys(profileTabs).map(category => (
						<Tab key={category}>
							{({ selected }) => (
								<ProfileCategory selected={selected}>
									{category}
								</ProfileCategory>
							)}
						</Tab>
					))}
				</ProfileCategories>
				<ProfilePanels>
					{Object.values(profileTabs).map((tabContent, idx) => (
						<Tab.Panel key={idx}>{tabContent}</Tab.Panel>
					))}
				</ProfilePanels>
			</Tab.Group>
		</ProfileWrapper>
	)
}
