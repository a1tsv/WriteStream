import App from './app/App'
import { StoreProvider } from '@app/providers'
import { Modals } from '@app/providers/ModalsProvider'
import '@app/styles/index.scss'
import ReactDOM from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<StoreProvider>
			<SkeletonTheme
				baseColor='var(--sk-primary)'
				highlightColor='var(--color-secondary)'
			>
				<Modals>
					<App />
				</Modals>
			</SkeletonTheme>
		</StoreProvider>
	</BrowserRouter>
)
