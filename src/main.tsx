import App from './app/App'
import { StoreProvider } from '@app/providers'
import '@app/styles/index.scss'
import ReactDOM from 'react-dom/client'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<SkeletonTheme
		baseColor='var(--sk-primary)'
		highlightColor='var(--color-secondary)'
	>
		<BrowserRouter>
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</SkeletonTheme>
)
