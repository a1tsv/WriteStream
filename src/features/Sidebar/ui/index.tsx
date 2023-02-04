import {
	SideBarLink,
	SideBarMenu,
	SideBarMenuItem,
	SideBarNav,
	SideBarWrapper
} from './StyledSideBar'
import { routes } from '@app/providers/AppRouter/model'
import { FC } from 'react'

interface ISideBarProps {
	isOpen: boolean
}

export const SideBar: FC<ISideBarProps> = ({ isOpen }) => {
	const menuItems = routes.filter(route => route.icon)

	return (
		<>
			<SideBarWrapper isOpen={isOpen}>
				<SideBarNav>
					<SideBarMenu>
						{menuItems.map(menuItem => (
							<SideBarMenuItem key={menuItem.path}>
								<SideBarLink to={menuItem.path}>
									{menuItem.icon}
									{menuItem.title}
								</SideBarLink>
							</SideBarMenuItem>
						))}
					</SideBarMenu>
				</SideBarNav>
			</SideBarWrapper>
		</>
	)
}
