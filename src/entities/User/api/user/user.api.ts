import { ILoginFields, ILoginResponse } from '../../model'
import { IUser } from '@entities/User/model/user.interface'
import { userAPI } from '@shared/api'
import { setItemToLC } from '@shared/utils/localStorage'

export const userUserApi = userAPI.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<ILoginResponse, ILoginFields>({
			query: data => ({
				url: '/auth/login',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(data, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
				if (res.data) {
					setItemToLC('accessToken', res.data.accessToken)
				}
			}
		}),
		authMe: build.query<IUser, string>({
			query: accessToken => ({
				url: '/auth/me',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
		})
	})
})

export const { useLoginMutation, useAuthMeQuery, useLazyAuthMeQuery } =
	userUserApi
