import { AppRouter } from './providers'
import { getItemFromLC } from '@shared/utils/localStorage'
import { Layout } from '@widgets/Layout'
import { Theme, ToastContainer } from 'react-toastify'

function App() {
	return (
		<>
			<Layout>
				<AppRouter />
			</Layout>
			<ToastContainer theme={(getItemFromLC('theme') as Theme) || 'light'} />
		</>
	)
}

export default App
