import { MainWrapper } from './StyledLayout'
import { SideBar } from '@features/Sidebar'
import { Container } from '@shared/ui/Container'
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
				<Container padding={'0 3.75rem'}>{children}</Container>
			</MainWrapper>
		</>
	)
}
