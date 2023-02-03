import App from './app/App'
import { AppRouter, StoreProvider } from '@app/providers'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<StoreProvider>
			<AppRouter>
				<App />
			</AppRouter>
		</StoreProvider>
	</BrowserRouter>
)
