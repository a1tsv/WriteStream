import { rootReducer, store } from '../config'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export type DefaultType = {
	variant: string
	color: string
}

// type PartialType = Partial<DefaultType> 👇

export type PartialType = {
	variant?: string
	color?: string
}
