import type {
	AnyAction,
	EnhancedStore,
	Middleware,
	Store
} from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cleanup } from '@testing-library/react'
import type { Reducer } from 'react'
import React from 'react'
import { Provider } from 'react-redux'

export function withProvider(store: Store<any>) {
	return function Wrapper({ children }: any) {
		return (
			<Provider store={store}>
				<div>Provider</div>
				{children}
			</Provider>
		)
	}
}

export function setupApiStore<
	A extends {
		reducerPath: 'adminAPI' | 'userAPI'
		reducer: Reducer<any, any>
		middleware: Middleware
		util: { resetApiState(): any }
	},
	R extends Record<string, Reducer<any, any>> = Record<never, never>
>(
	api: A,
	extraReducers?: R,
	options: {
		withoutListeners?: boolean
		withoutTestLifecycles?: boolean
		middleware?: {
			prepend?: Middleware[]
			concat?: Middleware[]
		}
	} = {}
) {
	const { middleware } = options
	const getStore = () =>
		configureStore({
			reducer: { api: api.reducer, ...extraReducers },
			middleware: gdm => {
				const tempMiddleware = gdm({
					serializableCheck: false,
					immutableCheck: false
				}).concat(api.middleware)

				return tempMiddleware
					.concat(...(middleware?.concat ?? []))
					.prepend(...(middleware?.prepend ?? [])) as typeof tempMiddleware
			}
		})

	type StoreType = EnhancedStore<
		{
			api: ReturnType<A['reducer']>
		} & {
			[K in keyof R]: ReturnType<R[K]>
		},
		AnyAction,
		ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
			? M
			: never
	>

	const initialStore = getStore() as StoreType
	const refObj = {
		api,
		store: initialStore,
		wrapper: withProvider(initialStore)
	}
	let cleanupListeners: () => void

	if (!options.withoutTestLifecycles) {
		beforeEach(() => {
			const store = getStore() as StoreType
			refObj.store = store
			refObj.wrapper = withProvider(store)
			if (!options.withoutListeners) {
				cleanupListeners = setupListeners(store.dispatch)
			}
		})
		afterEach(() => {
			cleanup()
			if (!options.withoutListeners) {
				cleanupListeners()
			}
			refObj.store.dispatch(api.util.resetApiState())
		})
	}

	return refObj
}
