import {
	IAuthMeResponse,
	ILoginFields,
	ITokenResponse,
	IForgotPasswordFields,
	IRegisterFields,
	INewPasswordPayload
} from '../model'
import './../model/user.interface'
import { IAddUserFields, IUser } from '@entities/User/model/user.interface'
import { api } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'
import { getAdminHeaders } from '@shared/utils/getAdminHeaders'
import { getBearerToken } from '@shared/utils/getBearerToken'
import { removeItemFromLC, setItemToLC } from '@shared/utils/localStorage'

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		authMe: build.query<IAuthMeResponse, string | void>({
			query: data => ({
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
					await dispatch(userApi.endpoints.authMe.initiate())
				}
			}
		}),
		logout: build.mutation<string, void>({
			query: data => ({
				url: '/auth/logout',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(data, { queryFulfilled }) {
				const res = await queryFulfilled
				if (res.data) {
					removeItemFromLC('accessToken')
				}
			},
			invalidatesTags: ['Auth']
		}),
		passwordRecovery: build.mutation<string, IForgotPasswordFields>({
			query: body => ({
				url: '/auth/password-recovery',
				method: 'POST',
				body
			})
		}),
		newPassword: build.mutation<string, INewPasswordPayload>({
			query: body => ({
				url: '/auth/new-password',
				method: 'POST',
				body
			})
		}),
		register: build.mutation<string, IRegisterFields>({
			query: body => ({
				url: '/auth/registration',
				method: 'POST',
				body
			})
		}),
		registerConfirmation: build.mutation<string, string>({
			query: body => ({
				url: '/auth/registration-confirmation',
				method: 'POST',
				body
			}),
			async onQueryStarted(data, { queryFulfilled }) {
				const res = await queryFulfilled
				if (res.data) {
					removeItemFromLC('email')
				}
			}
		}),
		resendRegisterEmail: build.mutation<string, string>({
			query: body => ({
				url: '/auth/registration-email-resending',
				method: 'POST',
				body
			})
		}),
		refreshToken: build.mutation<ITokenResponse, void>({
			query: () => ({
				url: '/auth/refresh-token',
				method: 'POST'
			})
		}),
		createUser: build.mutation<IUser, IAddUserFields>({
			query: data => ({
				url: '/sa/users',
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
				url: `/sa/users/${id}`,
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
	useRegisterMutation,
	useResendRegisterEmailMutation,
	usePasswordRecoveryMutation,
	useAuthMeQuery,
	useLazyAuthMeQuery,
	useNewPasswordMutation,
	useLogoutMutation,
	useRegisterConfirmationMutation,
	useRefreshTokenMutation
} = userApi
