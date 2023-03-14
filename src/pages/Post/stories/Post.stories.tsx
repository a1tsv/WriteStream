import { IPost } from '@entities/Post'
import { PostPage } from '@pages/Post'
import { baseURL } from '@shared/utils/baseURL'
import { ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { MemoryRouter, Routes } from 'react-router'
import { Route } from 'react-router-dom'

const post: IPost = {
	id: '123',
	blogName: 'My Blog',
	shortDescription: 'short description',
	blogId: '1',
	title: 'My Post',
	content: 'This is my post content',
	createdAt: '2023-02-06T00:00:00.000Z',
	extendedLikesInfo: {
		likesCount: 10,
		dislikesCount: 10,
		myStatus: 'None',
		newestLikes: [
			{ userId: '1', userLogin: 'Johny', addedAt: '2023-02-06T00:00:00.000Z' },
			{ userId: '2', userLogin: 'Mary', addedAt: '2023-02-06T00:00:00.000Z' },
			{ userId: '3', userLogin: 'Tony', addedAt: '2023-02-06T00:00:00.000Z' }
		]
	}
}

export default {
	title: 'Pages/Post',
	component: PostPage,
	parameters: {
		msw: [
			rest.get(`${baseURL}/posts/1`, (req, res, ctx) => {
				return res(ctx.json(post))
			})
		]
	}
} as ComponentMeta<typeof PostPage>

export const Default = () => {
	return (
		<MemoryRouter initialEntries={['/posts/1']}>
			<Routes>
				<Route path={'/posts/:id'} element={<PostPage />} />
			</Routes>
		</MemoryRouter>
	)
}
