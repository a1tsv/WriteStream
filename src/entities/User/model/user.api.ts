import { ILoginFields, ILoginResponse } from '.'
import { IAddUserFields, IUser } from '@entities/User/model/user.interface'
import { api } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<ILoginResponse, ILoginFields>({
			query: data => ({
				url: '/auth/login',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(data, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
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
		}),
		createUser: build.mutation<IUser, IAddUserFields>({
			query: data => ({
				url: '/users',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Users']
		}),
		getUsers: build.query<IGetItemsResponse<IUser[]>, Partial<IGetItemsModel>>({
			query: data => ({
				url: '/users',
				method: 'GET',
				params: data
			}),
			providesTags: ['Users']
		}),
		deleteUser: build.mutation<void, string>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE'
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
	useLazyAuthMeQuery
} = userApi
