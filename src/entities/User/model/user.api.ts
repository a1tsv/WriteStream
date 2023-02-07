import { ILoginFields, ILoginResponse } from '.'
import { api } from '@shared/api'

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<ILoginResponse, ILoginFields>({
			query: data => ({
				url: '/auth/login',
				method: 'POST',
				body: data
			})
		})
		// register: build.mutation<IRegisterResponse, IRegisterRequest>({
		// 	query: data => ({
		// 		url: '/register',
		// 		method: 'POST',
		// 		body: data
		// 	})
		// })
	})
})

export const { useLoginMutation } = userApi
