import App from './app/App'
import { AppRouter, StoreProvider } from '@app/providers'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StoreProvider>
		<AppRouter>
			<App />
		</AppRouter>
	</StoreProvider>
)
