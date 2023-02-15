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
			})
		}),
		createUser: build.mutation<IUser, IAddUserFields>({
			query: data => ({
				url: '/users',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['User']
		}),
		getUsers: build.query<IGetItemsResponse<IUser[]>, Partial<IGetItemsModel>>({
			query: data => ({
				url: '/users',
				method: 'GET',
				params: data
			}),
			providesTags: ['User']
		}),
		deleteUser: build.mutation<void, string>({
			query: id => ({
				url: `/users/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['User']
		})
	})
})

export const {
	useLoginMutation,
	useCreateUserMutation,
	useDeleteUserMutation,
	useGetUsersQuery
} = userApi
