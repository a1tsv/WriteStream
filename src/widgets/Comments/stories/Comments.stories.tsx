import { IComment } from '@entities/Comment'
import { api } from '@shared/api'
import { useAppDispatch } from '@shared/hooks'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Comments } from '@widgets/Comments'
import { rest } from 'msw'
import { useEffect } from 'react'

export default {
	title: 'Widgets/Comments',
	component: Comments,
	parameters: {
		msw: [
			rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
				ctx.json({})
			})
		]
	}
} as ComponentMeta<typeof Comments>

const items: IComment[] = [
	{
		id: 'comment1',
		content: 'This is the content of first comment',
		commentatorInfo: {
			userId: 'user1',
			userLogin: 'user1'
		},
		likesInfo: {
			likesCount: 10,
			dislikesCount: 5,
			myStatus: 'Like'
		},
		createdAt: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 'comment2',
		content: 'This is the content of second comment',
		commentatorInfo: {
			userId: 'user2',
			userLogin: 'user2'
		},
		likesInfo: {
			likesCount: 10,
			dislikesCount: 5,
			myStatus: 'Like'
		},
		createdAt: '2021-01-01T00:00:00.000Z'
	}
]

const Template: ComponentStory<typeof Comments> = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(api.util.resetApiState())
	}, [])

	return <Comments items={items} />
}

export const Authenticated = Template.bind({})
Authenticated.parameters = {
	msw: [
		rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
			return res(
				ctx.json({
					email: 'user2@gmail.com',
					login: 'user2',
					userId: 'user2'
				})
			)
		})
	]
}

export const Unauthenticated = Template.bind({})
Unauthenticated.parameters = {
	msw: [
		rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
			return res(ctx.status(401))
		})
	]
}
