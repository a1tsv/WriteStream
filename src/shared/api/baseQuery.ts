import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query/react'
import { baseURL } from '@shared/utils/baseURL'
import { getBearerToken } from '@shared/utils/getBearerToken'
import { setItemToLC } from '@shared/utils/localStorage'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
	baseUrl: baseURL,
	prepareHeaders: headers => {
		const alreadyHasHeader = headers.has('Authorization')
		const token = getBearerToken()
		if (token && !alreadyHasHeader) {
			headers.set('Authorization', token)
		}
		return headers
	}
	// credentials: 'include'
})

export const baseQueryWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock()
	const result = await baseQuery(args, api, extraOptions)
	if (result.error && result?.meta?.response?.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			try {
				const request = {
					url: '/auth/refresh-token',
					method: 'POST',
					credentials: 'include' as RequestCredentials
				}
				const refreshResult = await baseQuery(request, api, extraOptions)
				if (refreshResult.data) {
					setItemToLC('accessToken', refreshResult.data)
					await baseQuery(args, api, extraOptions)
				}
			} finally {
				release()
			}
		} else {
			await mutex.waitForUnlock()
			await baseQuery(args, api, extraOptions)
		}
	}
	return result
}
