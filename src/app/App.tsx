import { AppRouter } from './providers'
import { SideBar } from '@features/Sidebar'
import { Container } from '@shared/ui/Container/ui'
import { MenuLink } from '@shared/ui/MenuLink/ui'
import { Layout } from '@widgets/Layout'
import { RxRows } from 'react-icons/rx'
import styled from 'styled-components'

function App() {
	return (
		<>
			<Layout>
				<AppRouter />
			</Layout>
		</>
	)
}

export default App
