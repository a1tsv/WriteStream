import { LayoutContainer, MainWrapper } from './StyledLayout'
import { SideBar } from '@features/Sidebar'
import { Header } from '@widgets/Header'
import { FC, PropsWithChildren, useState } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	const [isSideBarOpen, setIsSidebarOpen] = useState(false)

	const changeSideBarState = () => setIsSidebarOpen(p => !p)

	return (
		<>
			<Header sideBarStateChanger={changeSideBarState} />
			<SideBar isOpen={isSideBarOpen} />
			<MainWrapper>
				<LayoutContainer>{children}</LayoutContainer>
			</MainWrapper>
		</>
	)
}
