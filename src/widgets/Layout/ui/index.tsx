import { LayoutContainer, MainWrapper } from './StyledLayout'
import { SideBar } from '@features/Sidebar'
import { useAllSelector } from '@shared/hooks'
import { LinearLoader } from '@shared/ui/LinearLoader'
import { Header } from '@widgets/Header'
import { FC, PropsWithChildren, useState } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	const [isSideBarOpen, setIsSidebarOpen] = useState(false)

	const changeSideBarState = () => setIsSidebarOpen(p => !p)
	const queryLoading = useAllSelector(
		state =>
			Object.values(state.adminAPI.queries).some(
				entry => entry?.status == 'pending'
			) ||
			Object.values(state.userAPI.queries).some(
				entry => entry?.status == 'pending'
			)
	)

	return (
		<>
			{queryLoading && <LinearLoader />}
			<Header sideBarStateChanger={changeSideBarState} />
			<SideBar isOpen={isSideBarOpen} />
			<MainWrapper>
				<LayoutContainer>{children}</LayoutContainer>
			</MainWrapper>
		</>
	)
}
