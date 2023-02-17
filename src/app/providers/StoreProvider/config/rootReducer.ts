import { combineReducers } from '@reduxjs/toolkit'
import { adminAPI, userAPI } from '@shared/api'

export const rootReducer = combineReducers({
	[adminAPI.reducerPath]: adminAPI.reducer,
	[userAPI.reducerPath]: userAPI.reducer
})
