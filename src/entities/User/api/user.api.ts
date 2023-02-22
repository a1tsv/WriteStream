import { IAuthMeResponse, ILoginFields, ITokenResponse } from '../model'
import { IAddUserFields, IUser } from '@entities/User/model/user.interface'
import { api } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'
import { getAdminHeaders } from '@shared/utils/getAdminHeaders'
import { setItemToLC } from '@shared/utils/localStorage'

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<ITokenResponse, ILoginFields>({
			query: data => ({
				url: '/auth/login',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Auth'],
			async onQueryStarted(data, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
				if (res.data) {
					setItemToLC('accessToken', res.data.accessToken)
				}
			}
		}),
		authMe: build.query<IAuthMeResponse, string>({
			query: token => ({
				url: '/auth/me',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}),
			providesTags: ['Auth']
		}),
		refreshToken: build.mutation<ITokenResponse, void>({
			query: () => ({
				url: '/auth/refresh-token',
				method: 'POST'
			})
			// invalidatesTags: ['Auth']
		}),
		createUser: build.mutation<IUser, IAddUserFields>({
			query: data => ({
				url: '/users',
				method: 'POST',
				body: data,
				headers: getAdminHeaders()
			}),
			invalidatesTags: ['Users']
		}),
		getUsers: build.query<IGetItemsResponse<IUser[]>, Partial<IGetItemsModel>>({
			query: data => ({
				url: '/users',
				method: 'GET',
				params: data,
				headers: getAdminHeaders()
			}),
			providesTags: ['Users']
		}),
		deleteUser: build.mutation<void, string>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE',
				headers: getAdminHeaders()
			}),
			invalidatesTags: ['Users']
		})
	})
})

export const {
	useLoginMutation,
	useCreateUserMutation,
	useDeleteUserMutation,
	useGetUsersQuery,
	useAuthMeQuery,
	useLazyAuthMeQuery,
	useRefreshTokenMutation
} = userApi
