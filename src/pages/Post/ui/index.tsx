import { useGetCommentsQuery, useGetPostQuery } from '@entities/Post'
import { PostSkeleton } from '@pages/Post/ui/PostSkeleton'
import {
	PostBlogTitle,
	PostDate,
	PostHeading,
	PostImg,
	PostMembership,
	PostNavigation,
	PostText,
	PostTitle,
	PostWrapper
} from '@pages/Post/ui/StyledPost'
import { BackTo } from '@shared/ui/BackTo'
import { IBreadCrumbsItem } from '@shared/ui/Breadcrumbs/model'
import { BreadCrumbs } from '@shared/ui/Breadcrumbs/ui'
import { NotFound } from '@shared/ui/NotFound'
import { formatData } from '@shared/utils/formatData'
import { Comments } from '@widgets/Comments'
import { useMemo } from 'react'
import { useParams } from 'react-router'

export const PostPage = () => {
	// Params
	const { id } = useParams<{ id: string }>()

	// Api calls
	const { data: post, isLoading } = useGetPostQuery(id as string)
	const { data: commentsData } = useGetCommentsQuery(id as string)

	// Vars
	const breadcrumbs: IBreadCrumbsItem[] = useMemo(
		() => [
			{ link: 'posts', title: 'Posts' },
			{
				link: `posts/${post?.id ? post.id : ''}`,
				title: post?.title ? post.title : ''
			}
		],
		[post]
	)

	return (
		<div>
			<BreadCrumbs items={breadcrumbs} />
			<PostNavigation>
				<BackTo to={'/posts'} text={'Back to posts'} />
			</PostNavigation>
			{post && commentsData?.items.length ? (
				<>
					<PostWrapper>
						<PostBlogTitle>{post.blogName}</PostBlogTitle>
						<PostHeading>
							<PostTitle>{post.title}</PostTitle>
							<PostMembership>(For public posts)</PostMembership>
							<PostDate>{formatData(post.createdAt)}</PostDate>
						</PostHeading>
						<PostImg />
						<PostText>{post.content}</PostText>
					</PostWrapper>
					<Comments items={commentsData?.items || []} />
				</>
			) : isLoading ? (
				<PostSkeleton />
			) : (
				<NotFound label={'Post not found 😔'} />
			)}
		</div>
	)
}
