import { rootReducer } from './rootReducer'
import { rtkQueryErrorLogger } from '@app/providers/StoreProvider/config/middleware'
import { configureStore } from '@reduxjs/toolkit'
import { adminAPI, userAPI } from '@shared/api'

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(rtkQueryErrorLogger)
			.concat(adminAPI.middleware)
			.concat(userAPI.middleware)
})
