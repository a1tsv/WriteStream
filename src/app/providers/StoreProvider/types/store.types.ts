import { rootReducer, store } from '../config'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
