import { combineReducers } from '@reduxjs/toolkit'
import { api } from '@shared/api'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer
})
