import { rootReducer } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { api } from '@shared/api'

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware)
})
