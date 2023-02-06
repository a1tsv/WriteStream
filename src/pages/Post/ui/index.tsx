import { useGetPostQuery } from '@entities/Post'
import {
	PostBlogTitle,
	PostDate,
	PostHeading,
	PostImg,
	PostMembership,
	PostText,
	PostTitle
} from '@pages/Post/ui/StyledPost'
import { BackTo } from '@shared/ui/BackTo'
import { useParams } from 'react-router'

export const PostPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: post, isLoading, error } = useGetPostQuery(id as string)

	return (
		<div>
			<BackTo to={'/posts'} text={'Back to posts'} />
			{post ? (
				<>
					<PostBlogTitle>{post.blogName}</PostBlogTitle>
					<PostHeading>
						<PostTitle>{post.title}</PostTitle>
						<PostMembership>(For public posts)</PostMembership>
						<PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
					</PostHeading>
					<PostImg />
					<PostText>{post.content}</PostText>
				</>
			) : (
				<div>Placeholder</div>
			)}
		</div>
	)
}
