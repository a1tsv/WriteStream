import { store } from '@app/providers/StoreProvider/config'
import { Provider } from 'react-redux'

export const StoreDecorator = (story: any) => {
	return (
		<Provider store={store}>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
			{story()}
		</Provider>
	)
}
