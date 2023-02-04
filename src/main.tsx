import App from './app/App'
import { AppRouter, StoreProvider } from '@app/providers'
import '@app/styles/index.scss'
import { Layout } from '@widgets/Layout'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<StoreProvider>
			<App />
		</StoreProvider>
	</BrowserRouter>
)
