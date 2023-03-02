import { IAuthMeResponse, ILoginFields, ITokenResponse } from '../model'
import { IAddUserFields, IUser } from '@entities/User/model/user.interface'
import { api } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'
import { getAdminHeaders } from '@shared/utils/getAdminHeaders'
import { setItemToLC } from '@shared/utils/localStorage'
import { getBearerToken } from '@shared/utils/getBearerToken'

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		authMe: build.query<IAuthMeResponse, string | void>({
			query: (data) => ({
				url: '/auth/me',
				method: 'GET',
				headers: {
					Authorization: data ?? getBearerToken()
				}
			}),
			providesTags: ['Auth']
		}),
		login: build.mutation<ITokenResponse, ILoginFields>({
			query: data => ({
				url: '/auth/login',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(data, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
				if (res.data) {
					setItemToLC('accessToken', res.data.accessToken)
					dispatch(userApi.endpoints.authMe.initiate())
				}
			}
		}),
		refreshToken: build.mutation<ITokenResponse, void>({
			query: () => ({
				url: '/auth/refresh-token',
				method: 'POST'
			})
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
				url: '/sa/users',
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
