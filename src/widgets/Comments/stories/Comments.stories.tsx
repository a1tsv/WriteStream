import { IComment } from '@entities/Comment'
import { IRatePayload } from '@entities/Comment/model'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Comments } from '@widgets/Comments'
import { rest } from 'msw'
import { useEffect } from 'react'

let items: IComment[] = [
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
			myStatus: 'None'
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
			myStatus: 'None'
		},
		createdAt: '2021-01-01T00:00:00.000Z'
	}
]

const baseMSWParametrs = [
	rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
		return res(ctx.status(401))
	}),
	rest.put(`${baseURL}/comments/*/like-status`, (req, res, ctx) => {
		const { likeStatus: sendedLikeStatus } = req.body as IRatePayload
		items = items.map(comment => {
			const currentMyStatus = comment.likesInfo.myStatus
			let likesCount = comment.likesInfo.likesCount
			let dislikesCount = comment.likesInfo.dislikesCount

			if (sendedLikeStatus !== 'None') {
				sendedLikeStatus === 'Like' ? likesCount++ : dislikesCount++
			}

			if (currentMyStatus !== 'None') {
				currentMyStatus === 'Like' ? likesCount-- : dislikesCount--
			}

			const newComment: IComment = {
				...comment,
				likesInfo: { likesCount, dislikesCount, myStatus: sendedLikeStatus }
			}

			return comment.id === req.params[0] ? newComment : comment
		})

		return res(ctx.json({}))
	})
]

export default {
	title: 'Widgets/Comments',
	component: Comments,
	parameters: {
		msw: baseMSWParametrs
	}
} as ComponentMeta<typeof Comments>

const Template: ComponentStory<typeof Comments> = args => {
	// const dispatch = useAppDispatch()

	useEffect(() => {
		console.log('in use effect')

		// dispatch(api.util.resetApiState())
	}, [items])

	console.log('rerendering component')

	return <Comments {...args} />
}

export const Authenticated = Template.bind({})
console.log('args is changing')

Authenticated.args = {
	items
}
Authenticated.parameters = {
	msw: [
		...baseMSWParametrs,
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
Unauthenticated.args = {
	items
}
Unauthenticated.parameters = {
	msw: [
		...baseMSWParametrs,
		rest.get(`${baseURL}/auth/me`, (req, res, ctx) => {
			return res(ctx.status(401))
		})
	]
}
