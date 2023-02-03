import { MenuLink } from '@shared/ui/MenuLink/ui'
import { RxRows } from 'react-icons/rx'

function App() {
	return (
		<div>
			<MenuLink to='/blogs'>
				<RxRows />
				Blogs
			</MenuLink>
		</div>
	)
}

export default App
