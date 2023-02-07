import { useGetPostQuery } from '@entities/Post'
import { PostSkeleton } from '@pages/Post/ui/PostSkeleton'
import {
	PostBlogTitle,
	PostDate,
	PostHeading,
	PostImg,
	PostMembership,
	PostNavigation,
	PostText,
	PostTitle
} from '@pages/Post/ui/StyledPost'
import { BackTo } from '@shared/ui/BackTo'
import { NotFound } from '@shared/ui/NotFound'
import { useParams } from 'react-router'

export const PostPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: post, isLoading } = useGetPostQuery(id as string)

	return (
		<div>
			<PostNavigation>
				<BackTo to={'/posts'} text={'Back to posts'} />
			</PostNavigation>
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
			) : isLoading ? (
				<PostSkeleton />
			) : (
				<NotFound label={'Post not found 😔'} />
			)}
		</div>
	)
}
