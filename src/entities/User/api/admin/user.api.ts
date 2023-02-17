import { IAddUserFields, IUser } from '@entities/User/model/user.interface'
import { adminAPI } from '@shared/api'
import { IGetItemsModel, IGetItemsResponse } from '@shared/api/api.interface'

export const userAdminApi = adminAPI.injectEndpoints({
	endpoints: build => ({
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
	useCreateUserMutation,
	useDeleteUserMutation,
	useGetUsersQuery
} = userAdminApi
